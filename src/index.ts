import { IDisposable } from '@lumino/disposable';

import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import { Clipboard, ToolbarButton } from '@jupyterlab/apputils';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  JupyterLab
} from '@jupyterlab/application';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';

import { pawsPublicLinkIcon } from './icons';

namespace CommandIDs {
  export const shareLink = 'filebrowser:share-main';

  export const publicWidget = 'labpawspublic:publicwidget';
}

class PawsPublicLinkButton
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  constructor(app: JupyterFrontEnd) {
    this.app = app;
  }

  readonly app: JupyterFrontEnd;
  /**
   * Create a new extension object.
   */
  createNew(panel: NotebookPanel): IDisposable {
    const button = new ToolbarButton({
      label: 'PAWS public link',
      tooltip: 'PAWS public link',
      icon: pawsPublicLinkIcon,
      onClick: () => {
        //window.alert("Hello world!");
        const path = panel.context.path;
        const user = JupyterLab.defaultPaths.urls.hubUser;
        window.open(
          `https://public.paws.wmcloud.org/User:${user}/${path}`,
          '_blank'
        );
      }
    });
    var link = document.querySelector("link[rel*='icon']") as HTMLAnchorElement || document.createElement('link');
    //var link = document.querySelectorAll<HTMLElement>('.mat-form-field-infix');
    //link.type = 'image/x-icon';
    //link.rel = 'shortcut icon';
    link.href = 'https://wikitech.wikimedia.org/static/favicon/wikitech.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    panel.toolbar.addItem('pawsPublicLink', button);
    //window.alert("Hello world4!");
    return button;
  }
}

function activate(app: JupyterFrontEnd, factory: IFileBrowserFactory): void {
  const { commands } = app;
  const { tracker } = factory;

  commands.addCommand(CommandIDs.shareLink, {
    execute: () => {
      //var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      //var link = document.querySelector("link[rel*='icon']") as HTMLAnchorElement || document.createElement('link');
      ////var link = document.querySelectorAll<HTMLElement>('.mat-form-field-infix');
      ////link.type = 'image/x-icon';
      ////link.rel = 'shortcut icon';
      //link.href = 'https://wikitech.wikimedia.org/static/favicon/wikitech.ico';
      //document.getElementsByTagName('head')[0].appendChild(link);
      //window.alert("Hello world3!");
      const widget = tracker.currentWidget;
      if (!widget) {
        return;
      }
      const path = encodeURI(widget.selectedItems().next()?.path || '');
      if (!path) {
        return;
      }
      const user = JupyterLab.defaultPaths.urls.hubUser;
      //window.alert("Hello world2!");
      Clipboard.copyToSystem(
        `https://public.paws.wmcloud.org/User:${user}/${path}`
      );
    },
    isVisible: () =>
      Boolean(
        tracker.currentWidget &&
          Array(tracker.currentWidget.selectedItems()).length === 1
      ),
    iconClass: 'jp-MaterialIcon jp-LinkIcon',
    label: 'Copy PAWS-public Link'
  });

  app.docRegistry.addWidgetExtension('Notebook', new PawsPublicLinkButton(app));
}
const extension: JupyterFrontEndPlugin<void> = {
  activate: activate,
  id: CommandIDs.shareLink,
  requires: [IFileBrowserFactory],
  autoStart: true
};
export default extension;
