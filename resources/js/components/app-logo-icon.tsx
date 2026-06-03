import type { ImgHTMLAttributes } from 'react';

const UDD_LOGO_URL = 'https://udd.edu.ph/images/logo.png';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            alt={props.alt ?? 'Universidad de Dagupan logo'}
            src={UDD_LOGO_URL}
        />
    );
}
