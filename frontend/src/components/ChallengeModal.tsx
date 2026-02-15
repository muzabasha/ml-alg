/**
 * ChallengeModal Component
 * 
 * Modal for displaying practice challenges with:
 * - Multiple choice question rendering
 * - Answer submission
 * - Immediate feedback and explanations
 * - Hint system on failed attempts
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import React, { useState, useEffect } from 'react';
import { Challenge, ChallengeResponse, AssessmentResult } from '../types/learning-path';

export interface ChallengeModalProps {
    /** Challenge to display */
    challenge: Challenge | null;
    /** Whether modal is open */
    isOpen: boolean;
    /** Callback when modal should close */
    onClose: () => void;
    /** Callback when answer is submitted */
    onSubmit: (challengeId: string, response: ChallengeResponse) => AssessmentResult;
    /** Custom className for additional styling */
    className?: string;
}

/**
 * ChallengeModal displays a practice challenge in a modal overlay
 * with immediate feedback and hint system.
 */
export const ChallengeModal: React.FC<ChallengeModalProps> = ({
    challenge,
    isOpen,
    onClose,
    onSubmit,
    className = ''
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    // Reset state when challenge changes
    useEffect(() => {
        if (challenge) {
            setSelectedAnswer('');
            setResult(null);
            setShowHint(false);
            setAttemptCount(0);
        }
    }, [challenge?.id]);

    // Handle answer submission
    const handleSubmit = () => {
        if (!challenge || !selectedAnswer) return;

        const response: ChallengeResponse = {
            challengeId: challenge.id,
            selectedAnswer,
            timeSpent: 0 // Could track actual time if needed
        };

        const assessmentResult = onSubmit(challenge.id, response);
        setResult(assessmentResult);
        setAttemptCount(prev => prev + 1);

        // Show hint on failure
        if (!assessmentResult.correct) {
            setShowHint(true);
        }
    };

    // Handle retry
    const handleRetry = () => {
        setSelectedAnswer('');
        setResult(null);
        setShowHint(false);
    };

    // Handle close
    const handleClose = () => {
        setSelectedAnswer('');
        setResult(null);
        setShowHint(false);
        setAttemptCount(0);
        onClose();
    };

    if (!isOpen || !challenge) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="challenge-title"
        >
            <div
                className={`bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 id="challenge-title" className="text-2xl font-black mb-1">
                                Practice Challenge
                            </h2>
                            <p className="text-indigo-100 text-sm">
                                Test your understanding
                            </p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                            aria-label="Close challenge"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Question */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                            {challenge.question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3">
                            {challenge.options.map((option, index) => {
                                const optionId = `option-${index}`;
                                const isSelected = selectedAnswer === option;
                                const isCorrect = result && option === challenge.correctAnswer;
                                const isWrong = result && isSelected && !isCorrect;

                                return (
                                    <label
                                        key={optionId}
                                        htmlFor={optionId}
                                        className={`
                                            block p-4 rounded-2xl border-2 cursor-pointer transition-all
                                            ${!result && isSelected ? 'border-indigo-600 bg-indigo-50' : ''}
                                            ${!result && !isSelected ? 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50' : ''}
                                            ${isCorrect ? 'border-green-600 bg-green-50' : ''}
                                            ${isWrong ? 'border-red-600 bg-red-50' : ''}
                                            ${result ? 'cursor-default' : ''}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                id={optionId}
                                                name="challenge-answer"
                                                value={option}
                                                checked={isSelected}
                                                onChange={(e) => !result && setSelectedAnswer(e.target.value)}
                                                disabled={!!result}
                                                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className={`flex-1 font-medium ${result ? (isCorrect ? 'text-green-900' : isWrong ? 'text-red-900' : 'text-slate-600') : 'text-slate-900'}`}>
                                                {option}
                                            </span>
                                            {isCorrect && (
                                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {isWrong && (
                                                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Feedback */}
                    {result && (
                        <div className={`p-6 rounded-2xl mb-6 ${result.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                            <div className="flex items-start gap-3">
                                {result.correct ? (
                                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <div className="flex-1">
                                    <h4 className={`font-black text-lg mb-2 ${result.correct ? 'text-green-900' : 'text-red-900'}`}>
                                        {result.correct ? 'Correct! 🎉' : 'Not quite right'}
                                    </h4>
                                    <p className={`text-sm mb-3 ${result.correct ? 'text-green-800' : 'text-red-800'}`}>
                                        {result.feedback}
                                    </p>
                                    {result.explanation && (
                                        <div className={`p-4 rounded-xl ${result.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                                            <p className={`text-sm font-medium ${result.correct ? 'text-green-900' : 'text-red-900'}`}>
                                                {result.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hint */}
                    {showHint && challenge.hint && !result?.correct && (
                        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-200 mb-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <h4 className="font-black text-amber-900 mb-2">
                                        Hint 💡
                                    </h4>
                                    <p className="text-sm text-amber-800">
                                        {challenge.hint}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        {!result ? (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
                                >
                                    Submit Answer
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="px-6 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : result.correct ? (
                            <button
                                onClick={handleClose}
                                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-green-700 transition-all shadow-lg active:scale-95"
                            >
                                Continue Learning
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleRetry}
                                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="px-6 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeModal;
