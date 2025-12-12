import { type RequestHandler } from 'express'
import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Services } from '../services'
import { FlashKey } from '../types/flash'
import { createErrorAlert, createSuccessAlert } from '../utils/alerts'
import { isJsonRequest } from '../utils/is-json-request'
import { DatasetAction } from '../types/entities/dataset'
import { DatasetsPagePresenter } from '../presenters/datasets/datasets-page'
import { DatasetPagePresenter } from '../presenters/datasets/dataset-page'
import { DatasetCreatePagePresenter } from '../presenters/datasets/dataset-create-page'
import { ValidationError } from '../errors'
import { createMockedDatasetPreviewData } from '../MOCK/test-preview-data'

// TODO: Improve error handling and logging

export class DatasetController {
  constructor(
    private readonly datasetService: Services['datasetService'],
    private readonly nunjucksEnvironment: NunjucksEnvironment,
  ) {}

  index: RequestHandler = async (req, res) => {
    const [datasets, filtersMetadata] = await Promise.all([
      this.datasetService.getList(req.query),
      this.datasetService.getFiltersMetadata(),
    ])

    const presenter = new DatasetsPagePresenter(
      datasets,
      filtersMetadata,
      req.query,
      this.nunjucksEnvironment,
      res.locals.routeDefinitions,
    )

    res.render('authoring/features/datasets/pages/index', presenter.present())
  }

  new: RequestHandler = async (_, res) => {
    const { user, routeDefinitions } = res.locals

    const [formMetadata, formValues] = await Promise.all([
      this.datasetService.getFormMetadata(),
      this.datasetService.getCreateFormValues(user),
    ])

    const presenter = new DatasetCreatePagePresenter(formMetadata, formValues, routeDefinitions)

    res.render('authoring/features/datasets/pages/create', presenter.present())
  }

  create: RequestHandler = async (req, res, next) => {
    const { routeDefinitions } = res.locals

    try {
      const dataset = await this.datasetService.create(req.body)

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          html: `Dataset <a href="${routeDefinitions.dataset.createUrl(dataset.id)}">${dataset.name}</a> has been successfully created!`,
        }),
      ])

      return res.redirect(303, routeDefinitions.datasets.createUrl())
    } catch (error) {
      if (error instanceof ValidationError) {
        const formMetadata = await this.datasetService.getFormMetadata()

        const presenter = new DatasetCreatePagePresenter(formMetadata, req.body, routeDefinitions, error)

        return res.status(400).render('authoring/features/datasets/pages/create', presenter.present())
      }

      return next(error)
    }
  }

  show: RequestHandler = async (req, res) => {
    const { id } = req.params
    const { routeDefinitions } = res.locals

    const [dataset, formMetadata] = await Promise.all([
      this.datasetService.getById(id),
      this.datasetService.getFormMetadata(),
    ])

    const formValues = this.datasetService.getFormValues(dataset)

    const presenter = new DatasetPagePresenter(dataset, formMetadata, formValues, routeDefinitions)

    res.render('authoring/features/datasets/pages/[id]', presenter.present())
  }

  update: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const { routeDefinitions } = res.locals

    try {
      const dataset = await this.datasetService.update({
        ...req.body,
        id,
      })

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          html: `Dataset <a href="${routeDefinitions.dataset.createUrl(dataset.id)}">${dataset.name}</a> has been successfully updated!`,
        }),
      ])

      return res.redirect(303, routeDefinitions.dataset.createUrl(dataset.id))
    } catch (error) {
      if (error instanceof ValidationError) {
        const [dataset, formMetadata] = await Promise.all([
          this.datasetService.getById(id),
          this.datasetService.getFormMetadata(),
        ])

        const presenter = new DatasetPagePresenter(dataset, formMetadata, req.body, routeDefinitions, error)

        return res.status(400).render('authoring/features/datasets/pages/[id]', presenter.present())
      }

      return next(error)
    }
  }

  showPreview: RequestHandler = async (req, res) => {
    // TODO: Prototype | Revisit this temp implementation and relative code
    const { id } = req.params
    const { routeDefinitions } = res.locals

    try {
      const dataset = await this.datasetService.getById(id)
      const previewData = createMockedDatasetPreviewData()

      res.render('authoring/features/datasets/pages/preview', {
        dataset,
        previewData,
        routeDefinitions,
        pageTitle: `Previewing Dataset: ${dataset.name}`,
        heading: `Previewing Dataset: ${dataset.name}`,
        breadcrumbItems: [
          { text: 'Datasets', href: routeDefinitions.datasets.createUrl() },
          { text: dataset.name, href: routeDefinitions.dataset.createUrl(dataset.id) },
          { text: 'Preview' },
        ],
        alerts: [],
        errorSummaryList: [],
      })
    } catch (error) {
      // TODO: Prototype: Improve error handling and logging
      console.error(error)
      res.redirect(303, routeDefinitions.datasets.createUrl())
    }
  }

  preview: RequestHandler = async (req, res) => {
    const { id } = req.params
    const { routeDefinitions } = res.locals
    const expectsJson = isJsonRequest(req)

    try {
      await this.datasetService.performAction(id, DatasetAction.Preview) // TODO: Prototype: Implement this flow with real data

      const previewUrl = routeDefinitions.datasetPreview.createUrl(id)

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          title: 'Your preview is ready!',
          showTitleAsHeading: true,
          html: `To see the latest data, please <a href="${routeDefinitions.dataset.createUrl(id)}">refresh this page</a> after your preview is complete.`,
        }),
      ])

      if (expectsJson) {
        res.status(200).json({ redirectUrl: previewUrl })

        return
      }

      res.redirect(303, previewUrl)
    } catch (error) {
      console.error(error)
      const errorMessage = 'Something went wrong while preparing your preview. Please try again.'

      req.flash(FlashKey.Alerts, [createErrorAlert({ text: errorMessage })])

      if (expectsJson) {
        res.status(500).json({ message: errorMessage })

        return
      }

      res.redirect(303, routeDefinitions.dataset.createUrl(id))
    }
  }

  approveAndPublish: RequestHandler = async (req, res) => {
    const { id } = req.params
    const redirectUrl = res.locals.routeDefinitions.dataset.createUrl(id)

    try {
      await this.datasetService.performAction(id, DatasetAction.ApproveAndPublish)

      const successMessage = 'The dataset has been successfully approved and published!'

      req.flash(FlashKey.Alerts, createSuccessAlert({ html: successMessage }))
    } catch (error) {
      const errorMessage = 'Something went wrong while approving & publishing the dataset. Please try again.'

      console.error(error)
      req.flash(FlashKey.Alerts, createErrorAlert({ text: errorMessage }))
    } finally {
      res.redirect(303, redirectUrl)
    }
  }
}
