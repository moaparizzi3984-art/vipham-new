import { createBrowserRouter } from 'react-router';
import Index from '@/pages/index';
import NotFound from '@/pages/not-found';
import { PATHS } from '@/router/paths';

const router = createBrowserRouter([
    {
        path: `${PATHS.HOME}/*`,
        element: <Index />
    },
    {
        path: '/',
        element: <NotFound />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export { PATHS } from '@/router/paths';
export default router;
