import Handlebars from 'handlebars';
import * as Components from './components';
import './styles/style.scss';
import router from './router';


Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
})

document.addEventListener('DOMContentLoaded', () => {
    window.onpopstate = router.urlLocationHandler;
    window.route = router.routes;
    router.urlLocationHandler();
});
