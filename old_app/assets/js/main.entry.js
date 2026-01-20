import * as govukFrontend from 'govuk-frontend'
import * as mojFrontend from '@ministryofjustice/frontend'
import { MultiSelect } from './components/multi-select.mjs'
import { FormManager } from './components/form-manager.mjs'
import { ServerSideSortableTable } from './components/server-side-sortable-table/server-side-sortable-table.mjs'
import { ProgressBar } from './components/progress-bar.mjs'

govukFrontend.initAll()
mojFrontend.initAll()

govukFrontend.createAll(MultiSelect)
govukFrontend.createAll(FormManager)
govukFrontend.createAll(ServerSideSortableTable)

const progressBar = ProgressBar.getInstance()

if (progressBar) {
  window.addEventListener('beforeunload', () => progressBar.show())
}
