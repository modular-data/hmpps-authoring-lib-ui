import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Dataset, type DatasetState } from '../../../types/entities/dataset'
import { createColumnHelper } from '../../../utils/ui/table/create-column-helper'
import { NO_DATA_PLACEHOLDER } from '../../../constants/common'
import { RECENT_DATASET_THRESHOLD_MS } from '../../../constants/datasets'
import { type RouteDefinitions } from '../../../utils/route-definitions'

const columnHelper = createColumnHelper<Dataset>()

const nameCellTemplateSource = `
  {% from "authoring/components/new-indicator/macro.njk" import appNewIndicator %}

  <a class="govuk-link" href="{{ href }}">
    {% if isRecentlyCreated %}
      {{ appNewIndicator(classes = "datasets-table__new-indicator") }}
    {% endif %}

    {{ name }}
  </a>
`

const dateCellTemplateSource = `{{ date | mojDate("shortdatetime") }}`

const tagsCellTemplateSource = `
  {%- from "govuk/components/tag/macro.njk" import govukTag -%}
  {%- from "authoring/components/tags/macro.njk" import tags as tagList -%}

  {% call tagList() %}
    {% for tag in tags %}
      {{ govukTag({ classes: "govuk-tag--grey", text: tag.name }) }}
    {% endfor %}
  {% endcall %}
`

const stateCellTemplateSource = `
  {% from "authoring/features/datasets/components/dataset-state-tag/macro.njk" import datasetStateTag %}

  {{ datasetStateTag(state = state) }}
`

const dataSourceCellTemplateSource = `
  <a class="govuk-link" href="{{ href }}">{{ name }}</a>
`

const linkedDataProductsCellTemplateSource = `
  {% for dataProduct in linkedDataProducts %}
    <a class="govuk-link" href="{{ dataProduct.href }}">{{ dataProduct.name }}</a>{% if not loop.last %}, {% endif %}
  {% endfor %}
`

interface RenderNameCellData {
  name: string
  href: string
  isRecentlyCreated: boolean
}

interface RenderDataSourceCellData {
  name: string
  href: string
}

interface RenderLinkedDataProductsCellData {
  linkedDataProducts: Array<{ name: string; href: string }>
}

export const createDatasetTableColumns = (
  nunjucksEnvironment: NunjucksEnvironment,
  routeDefinitions: RouteDefinitions,
) => {
  const renderNameCell = (data: RenderNameCellData) => {
    return nunjucksEnvironment.renderString(nameCellTemplateSource, data)
  }

  const renderDateCell = (date: string | null) => {
    return date ? nunjucksEnvironment.renderString(dateCellTemplateSource, { date }) : NO_DATA_PLACEHOLDER
  }

  const renderTagsCell = (tags: Dataset['tags']) => {
    return tags.length ? nunjucksEnvironment.renderString(tagsCellTemplateSource, { tags }) : NO_DATA_PLACEHOLDER
  }

  const renderStateCell = (state: DatasetState) => {
    return nunjucksEnvironment.renderString(stateCellTemplateSource, { state })
  }

  const renderDataSourceCell = (data: RenderDataSourceCellData) => {
    return nunjucksEnvironment.renderString(dataSourceCellTemplateSource, data)
  }

  const renderLinkedDataProductsCell = (data: RenderLinkedDataProductsCellData) => {
    return data.linkedDataProducts.length
      ? nunjucksEnvironment.renderString(linkedDataProductsCellTemplateSource, data)
      : NO_DATA_PLACEHOLDER
  }

  return [
    columnHelper.accessor('name', {
      header: 'Name',
      sortable: true,
      enableHiding: false,
      toGdsTableCell: ({ rowData }) => {
        const { id, name, metadata } = rowData

        const href = routeDefinitions.dataset.createUrl(id)

        const now = Date.now()
        const isRecentlyCreated = now - new Date(metadata.createdAt).getTime() <= RECENT_DATASET_THRESHOLD_MS

        return {
          classes: 'datasets-table__cell--name',
          html: renderNameCell({ name, href, isRecentlyCreated }),
        }
      },
    }),
    columnHelper.accessor('metadata.version', {
      header: 'Version',
      sortable: true,
    }),
    columnHelper.accessor('metadata.owner', {
      header: 'Owner',
      sortable: true,
      toGdsTableCell: ({ getValue }) => ({
        classes: 'datasets-table__cell--owner',
        text: getValue(),
      }),
    }),
    columnHelper.accessor('dataSource', {
      header: 'Data Source',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        const dataSource = getValue()
        const href = routeDefinitions.dataSource.createUrl(dataSource.id)

        return {
          classes: 'datasets-table__cell--data-source',
          html: renderDataSourceCell({ name: dataSource.name, href }),
        }
      },
    }),
    columnHelper.accessor('linkedDataProducts', {
      header: 'Related Data Products',
      toGdsTableCell: ({ getValue }) => {
        const linkedDataProducts = getValue().map(dataProduct => ({
          name: dataProduct.name,
          href: routeDefinitions.dataProduct.createUrl(dataProduct.id),
        }))

        return {
          classes: 'datasets-table__cell--linked-data-products',
          html: renderLinkedDataProductsCell({ linkedDataProducts }),
        }
      },
    }),
    columnHelper.accessor('metadata.createdAt', {
      header: 'Created',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'datasets-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('metadata.updatedAt', {
      header: 'Modified',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'datasets-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('metadata.previewedAt', {
      header: 'Previewed',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'datasets-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'datasets-table__cell--tags',
          html: renderTagsCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('state', {
      header: 'State',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          html: renderStateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      toGdsTableCell: ({ getValue }) => ({
        classes: 'datasets-table__cell--description',
        text: getValue() || NO_DATA_PLACEHOLDER,
      }),
    }),
  ]
}
