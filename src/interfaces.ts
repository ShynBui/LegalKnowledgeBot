import React from 'react';

export interface IRoute {
    path: string;
    page: React.FC;
    layout?: React.FC<React.PropsWithChildren<{}>>;
}

export interface Props {
    id?: string;
    parentRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    onClick?: (e: any) => void;
    className?: string;
}
