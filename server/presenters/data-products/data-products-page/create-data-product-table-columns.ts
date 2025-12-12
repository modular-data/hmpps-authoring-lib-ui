import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type DataProduct, type DataProductState } from '../../../types/entities/data-product'
import { createColumnHelper } from '../../../utils/ui/table/create-column-helper'
import { flattenRecordValues } from '../../../utils/flatten-record-values'
import { formatPercents } from '../../../utils/dataFormat/format-percents'
import { NO_DATA_PLACEHOLDER } from '../../../constants/common'
import { RECENT_DATA_PRODUCT_THRESHOLD_MS } from '../../../constants/data-products'
import { type RouteDefinitions } from '../../../utils/route-definitions'

const columnHelper = createColumnHelper<DataProduct>()

const nameCellTemplateSource = `
  {% from "authoring/components/new-indicator/macro.njk" import appNewIndicator %}

  <a class="govuk-link" href="{{ href }}">
    {% if isRecentlyCreated %}
      {{ appNewIndicator(classes = "data-products-table__new-indicator") }}
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
  {% from "authoring/features/data-products/components/data-product-state-tag/macro.njk" import dataProductStateTag %}

  {{ dataProductStateTag(state = state) }}
`

interface RenderNameCellData {
  name: string
  href: string
  isRecentlyCreated: boolean
}

export const createDataProductTableColumns = (
  nunjucksEnvironment: NunjucksEnvironment,
  routeDefinitions: RouteDefinitions,
) => {
  const renderNameCell = (data: RenderNameCellData) => {
    return nunjucksEnvironment.renderString(nameCellTemplateSource, data)
  }

  const renderDateCell = (date: string | null) => {
    return date ? nunjucksEnvironment.renderString(dateCellTemplateSource, { date }) : NO_DATA_PLACEHOLDER
  }

  const renderTagsCell = (tags: DataProduct['tags']) => {
    return tags.length ? nunjucksEnvironment.renderString(tagsCellTemplateSource, { tags }) : NO_DATA_PLACEHOLDER
  }

  const renderStateCell = (state: DataProductState) => {
    return nunjucksEnvironment.renderString(stateCellTemplateSource, { state })
  }

  return [
    columnHelper.accessor('name', {
      header: 'Name',
      sortable: true,
      enableHiding: false,
      toGdsTableCell: ({ rowData }) => {
        const { id, name, metadata } = rowData

        const href = routeDefinitions.dataProduct.createUrl(id)

        const now = Date.now()
        const isRecentlyCreated = now - new Date(metadata.createdAt).getTime() <= RECENT_DATA_PRODUCT_THRESHOLD_MS

        return {
          classes: 'data-products-table__cell--name',
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
        classes: 'data-products-table__cell--owner',
        text: getValue(),
      }),
    }),
    columnHelper.accessor('assets', {
      header: 'Assets',
      toGdsTableCell: ({ getValue }) => {
        const text = flattenRecordValues(getValue())
          .map(asset => asset.name)
          .join(', ')

        return {
          classes: 'data-products-table__cell--assets',
          text,
        }
      },
    }),
    columnHelper.accessor('outputs', {
      header: 'Outputs',
      toGdsTableCell: ({ getValue }) => {
        const text = flattenRecordValues(getValue())
          .map(output => output.name)
          .join(', ')

        return {
          classes: 'data-products-table__cell--outputs',
          text,
        }
      },
    }),
    columnHelper.accessor('qualityMetrics.accuracy', {
      header: 'Accuracy',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        const accuracy = getValue()

        return {
          text: accuracy ? formatPercents(accuracy) : NO_DATA_PLACEHOLDER,
          format: 'numeric',
        }
      },
    }),
    columnHelper.accessor('qualityMetrics.consistency', {
      header: 'Consistency',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        const consistency = getValue()

        return {
          text: consistency ? formatPercents(consistency) : NO_DATA_PLACEHOLDER,
          format: 'numeric',
        }
      },
    }),
    columnHelper.accessor('metadata.createdAt', {
      header: 'Created',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'data-products-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('metadata.updatedAt', {
      header: 'Modified',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'data-products-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('metadata.lastPreviewedAt', {
      header: 'Previewed',
      sortable: true,
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'data-products-table__cell--date',
          text: renderDateCell(getValue()),
        }
      },
    }),
    columnHelper.accessor('policies', {
      header: 'Policies',
      toGdsTableCell: ({ getValue }) => {
        const text = getValue()
          .map(policy => policy.name)
          .join(', ')

        return {
          classes: 'data-products-table__cell--policies',
          text,
        }
      },
    }),
    columnHelper.accessor('collaborators', {
      header: 'Collaborators',
      toGdsTableCell: () => ({
        classes: 'data-products-table__cell--collaborators',
        text: NO_DATA_PLACEHOLDER,
      }),
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      toGdsTableCell: ({ getValue }) => {
        return {
          classes: 'data-products-table__cell--tags',
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
        classes: 'data-products-table__cell--description',
        text: getValue() || NO_DATA_PLACEHOLDER,
      }),
    }),
  ]
}
