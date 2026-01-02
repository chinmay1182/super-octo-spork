"use client"
import React from 'react';
import { useTranslatedText } from '../hooks/useTranslatedText';

interface TranslatedTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
    [key: string]: any;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({
    text,
    className,
    as: Component = 'span',
    ...props
}) => {
    const translatedText = useTranslatedText(text);

    return (
        <Component className={className} {...props}>
            {translatedText}
        </Component>
    );
};

export default TranslatedText;