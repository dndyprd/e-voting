import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}

declare global {
    function route(name: string, params?: any): string;

    namespace JSX {
        interface IntrinsicElements {
            'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                src?: string;
                background?: string;
                speed?: string | number;
                loop?: boolean;
                autoplay?: boolean;
            }, HTMLElement>;
        }
    }
}

export { };
