import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'favicon:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    //console.log('the JupyterLab main application:', app);
    var favicon = document.querySelector("link[rel*='icon']") as HTMLAnchorElement || document.createElement('link');
    favicon.href = 'https://wikitech.wikimedia.org/static/favicon/wikitech.ico';
    document.getElementsByTagName('head')[0].appendChild(favicon);
  },
};

export default plugin;

