import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { LearningPathProvider } from '../contexts/LearningPathContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <LearningPathProvider studentId="default_student">
            <Component {...pageProps} />
        </LearningPathProvider>
    )
}
