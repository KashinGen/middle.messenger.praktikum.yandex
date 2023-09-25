import * as Pages from '../pages';
import Handlebars from 'handlebars';

const routes = {
    404: {
        template: Pages.ErrorPage,
        title: 'Ничего не нашли :(',
        description: 'Ничего не нашли :(',
        context: {
            errorCode: '404',
            errorText: 'Страница не найдена',
        } 
    },
    '/500': {
        template: Pages.ErrorPage,
        title: 'Ошибка :(',
        description: 'Ошибка :(',
        context: {
            errorCode: '500',
            errorText: 'Ошибка :(',
        } 
    },
    '/': {
        template: Pages.LoginPage,
        title: 'Авторизация',
        description: 'Авторизация',
        name: 'login',
    },
    '/login': {
        template: Pages.LoginPage,
        title: 'Авторизация',
        description: 'Авторизация',
        name: 'login',
    },
    '/register': {
        template: Pages.RegistrationPage,
        title: 'Регистрация',
        description: 'Регистрация',
    },
    '/chats': {
        template: Pages.ChatsPage,
        title: 'Чаты',
        description: 'Чаты',
    },
    '/profile': {
        template: Pages.ProfilePage,
        title: 'Личный кабинет',
        description: 'Личный кабинет',
    },
    '/profile-change': {
        template: Pages.ChangeProfileDataPage,
        title: 'Изменить данные',
        description: 'Изменить данные',
    },
    '/profile-password': {
        template: Pages.ChangePasswordPage,
        title: 'Изменить пароль',
        description: 'Изменить пароль',
    },
    
};




const attachRouterListeners = () => {
    const links = document.querySelectorAll('.router-link');
    for (const link of links) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const href = link.closest('.router-link');
            if (!target || !(href instanceof HTMLAnchorElement)) {
                return;
            }
            urlRoute(e);
        });
    }
}


const urlRoute = (e) => {
    e = e || window.event;
    if (e) {
        e.preventDefault();
        const target = e.target;
        if (target && (target instanceof HTMLElement || target instanceof SVGElement)) {
            const href = target.closest('.router-link');
            if (e.target ) {
                window.history.pushState({}, '', href.href);
                urlLocationHandler();
            }
        }
    }
};

const urlLocationHandler = () => {
    let location = window.location.pathname;
    if (location.length === 0) {
        location = '/';
    }
    const route = routes[location] || routes[404];
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = Handlebars.compile(route.template)(route.context);
        attachRouterListeners();
        document.title = route.title;
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', route.description);
        }
    }
};

const push = (path) => {
    const href = window.location.origin + path.toString();
    window.history.pushState({}, '', href);
    urlLocationHandler();
};

const router = {
    urlLocationHandler,
    routes,
    urlRoute,
    push,
    attachRouterListeners
};

export default router;
