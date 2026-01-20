import { type RequestHandler } from 'express'
import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Services } from '../services'
import { FlashKey } from '../types/flash'
import { createErrorAlert, createSuccessAlert } from '../utils/alerts'
import { isJsonRequest } from '../utils/is-json-request'
import { logger } from '../logger'
import { DataProductAction } from '../types/entities/data-product'
import { DataProductsPagePresenter } from '../presenters/data-products/data-products-page'
import { DataProductPagePresenter } from '../presenters/data-products/data-product-page'
import { DataProductCreatePagePresenter } from '../presenters/data-products/data-product-create-page'
import { ValidationError } from '../errors'
import { createMockedDataProductPreviewData } from '../MOCK/test-preview-data'

// TODO: Improve error handling and logging

export class DataProductController {
  constructor(
    private readonly dataProductService: Services['dataProductService'],
    private readonly nunjucksEnvironment: NunjucksEnvironment,
  ) {}

  index: RequestHandler = async (req, res, next) => {
    try {
      const [dataProducts, filtersMetadata] = await Promise.all([
        this.dataProductService.getList(req.query),
        this.dataProductService.getFiltersMetadata(),
      ])

      const presenter = new DataProductsPagePresenter(
        dataProducts,
        filtersMetadata,
        req.query,
        this.nunjucksEnvironment,
        res.locals.routeDefinitions,
      )

      res.render('authoring/features/data-products/pages/index', presenter.present())
    } catch (error) {
      // TODO: MOJ-45 | Implement basic error handling
      logger.error(error)

      next(error)
    }
  }

  new: RequestHandler = async (_, res) => {
    const { user, routeDefinitions } = res.locals

    const [formMetadata, formValues] = await Promise.all([
      this.dataProductService.getFormMetadata(),
      this.dataProductService.getCreateFormValues(user),
    ])

    const presenter = new DataProductCreatePagePresenter(formMetadata, formValues, routeDefinitions)

    res.render('authoring/features/data-products/pages/create', presenter.present())
  }

  create: RequestHandler = async (req, res, next) => {
    const { routeDefinitions } = res.locals

    try {
      const dataProduct = await this.dataProductService.create(req.body)

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          html: `Data Product <a href="${routeDefinitions.dataProduct.createUrl(dataProduct.id)}">${dataProduct.name}</a> has been successfully created!`,
        }),
      ])

      return res.redirect(303, routeDefinitions.dataProducts.createUrl())
    } catch (error) {
      if (error instanceof ValidationError) {
        const formMetadata = await this.dataProductService.getFormMetadata()

        const presenter = new DataProductCreatePagePresenter(formMetadata, req.body, routeDefinitions, error)

        return res.status(400).render('authoring/features/data-products/pages/create', presenter.present())
      }

      return next(error)
    }
  }

  show: RequestHandler = async (req, res) => {
    const { id } = req.params
    const { routeDefinitions } = res.locals

    const [dataProduct, formMetadata] = await Promise.all([
      this.dataProductService.getById(id),
      this.dataProductService.getFormMetadata(),
    ])

    const formValues = this.dataProductService.getFormValues(dataProduct)

    const presenter = new DataProductPagePresenter(dataProduct, formMetadata, formValues, routeDefinitions)

    res.render('authoring/features/data-products/pages/[id]', presenter.present())
  }

  update: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const { routeDefinitions } = res.locals

    try {
      const dataProduct = await this.dataProductService.update({
        ...req.body,
        id,
      })

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          html: `Data Product <a href="${routeDefinitions.dataProduct.createUrl(dataProduct.id)}">${dataProduct.name}</a> has been successfully updated!`,
        }),
      ])

      return res.redirect(303, routeDefinitions.dataProduct.createUrl(dataProduct.id))
    } catch (error) {
      if (error instanceof ValidationError) {
        const [dataProduct, formMetadata] = await Promise.all([
          this.dataProductService.getById(id),
          this.dataProductService.getFormMetadata(),
        ])

        const presenter = new DataProductPagePresenter(dataProduct, formMetadata, req.body, routeDefinitions, error)

        return res.status(400).render('authoring/features/data-products/pages/[id]', presenter.present())
      }

      return next(error)
    }
  }

  showPreview: RequestHandler = async (req, res) => {
    // TODO-IMPLEMENT: MOJ-72 | Remove it and all relative code after we complete real Preview integration
    const { id } = req.params
    const { routeDefinitions } = res.locals

    try {
      const dataProduct = await this.dataProductService.getById(id)
      const previewData = createMockedDataProductPreviewData()

      res.render('authoring/features/data-products/pages/preview', {
        dataProduct,
        previewData,
        routeDefinitions,
        pageTitle: `Previewing Data Product: ${dataProduct.name}`,
        heading: `Previewing Data Product: ${dataProduct.name}`,
        breadcrumbItems: [
          { text: 'Data Products', href: routeDefinitions.dataProducts.createUrl() },
          { text: dataProduct.name, href: routeDefinitions.dataProduct.createUrl(dataProduct.id) },
          { text: 'Preview' },
        ],
        alerts: [],
        errorSummaryList: [],
      })
    } catch (error) {
      logger.error(error)
      res.redirect(303, routeDefinitions.dataProducts.createUrl())
    }
  }

  preview: RequestHandler = async (req, res) => {
    const { id } = req.params
    const expectsJson = isJsonRequest(req)
    const { routeDefinitions } = res.locals

    try {
      await this.dataProductService.performAction(id, DataProductAction.Preview)

      const previewUrl = routeDefinitions.dataProductPreview.createUrl(id) // TODO-IMPLEMENT: MOJ-72 Replace it by correct url during integration with Preview tool

      req.flash(FlashKey.Alerts, [
        createSuccessAlert({
          title: 'Your preview is ready!',
          showTitleAsHeading: true,
          html: `To see the latest data, please <a href="${routeDefinitions.dataProduct.createUrl(id)}">refresh this page</a> after your preview is complete.`,
        }),
      ])

      if (expectsJson) {
        res.status(200).json({ redirectUrl: previewUrl })

        return
      }

      res.redirect(303, previewUrl)
    } catch (error) {
      logger.error(error)
      const errorMessage = 'Something went wrong while preparing your preview. Please try again.'

      req.flash(FlashKey.Alerts, [createErrorAlert({ text: errorMessage })])

      if (expectsJson) {
        res.status(500).json({ message: errorMessage })

        return
      }

      res.redirect(303, routeDefinitions.dataProduct.createUrl(id))
    }
  }

  approveAndPublish: RequestHandler = async (req, res) => {
    const { id } = req.params
    const redirectUrl = res.locals.routeDefinitions.dataProduct.createUrl(id)

    try {
      await this.dataProductService.performAction(id, DataProductAction.ApproveAndPublish)

      const successMessage = 'The data product has been successfully approved and published!'

      req.flash(FlashKey.Alerts, createSuccessAlert({ html: successMessage }))
    } catch (error) {
      const errorMessage = 'Something went wrong while approving & publishing the data product. Please try again.'

      logger.error(error)
      req.flash(FlashKey.Alerts, createErrorAlert({ text: errorMessage }))
    } finally {
      res.redirect(303, redirectUrl)
    }
  }
}
