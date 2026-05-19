import { useCallback, useEffect, useRef, useState } from 'react';
import '@/assets/css/intro-captcha.css';
import MetaLogo from '@/assets/images/logo-meta.svg';
import RecaptchaBadge from '@/assets/images/recaptcha.png';

const VERIFY_DELAY_MS = 1400;
const DONE_DELAY_MS = 500;
const TICK_DRAW_MS = 360;

const RecaptchaTick = () => (
    <svg className="recaptcha-tick" viewBox="0 0 24 24" aria-hidden="true">
        <path className="recaptcha-tick-leg recaptcha-tick-leg--short" pathLength="1" d="M5 13.2 9.4 17.4" />
        <path className="recaptcha-tick-leg recaptcha-tick-leg--long" pathLength="1" d="M9.4 17.4 19.2 7.6" />
    </svg>
);

const IntroLoading = ({ onDone }) => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [status, setStatus] = useState('idle');
    const timersRef = useRef([]);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    }, []);

    const finishIntro = useCallback(() => {
        setFadeOut(true);
        const doneTimer = setTimeout(() => {
            setVisible(false);
            onDone?.();
        }, DONE_DELAY_MS);
        timersRef.current.push(doneTimer);
    }, [onDone]);

    const handleCaptchaChange = useCallback(() => {
        if (status !== 'idle') return;

        setStatus('loading');
        const verifyTimer = setTimeout(() => {
            setStatus('checked');
            const finishTimer = setTimeout(finishIntro, TICK_DRAW_MS + DONE_DELAY_MS);
            timersRef.current.push(finishTimer);
        }, VERIFY_DELAY_MS);
        timersRef.current.push(verifyTimer);
    }, [finishIntro, status]);

    useEffect(() => () => clearTimers(), [clearTimers]);

    if (!visible) return null;

    const isBusy = status !== 'idle';
    const iconClass = ['recaptcha-icon', status === 'loading' && 'is-loading', status === 'checked' && 'is-checked']
        .filter(Boolean)
        .join(' ');

    return (
        <div className={`intro-captcha-overlay${fadeOut ? ' is-fading' : ''}`}>
            <div className="intro-captcha-panel">
                <div>
                    <img src={MetaLogo} alt="Meta" className="intro-captcha-logo" />
                </div>

                <div className="intro-captcha-widget">
                    <div className="intro-captcha-box">
                        <div className="intro-captcha-box-left">
                            <div className="intro-captcha-check-wrap">
                                <label
                                    className={`recaptcha-check${isBusy ? ' is-disabled' : ''}`}
                                    htmlFor="checked-captcha"
                                >
                                    <input
                                        type="checkbox"
                                        id="checked-captcha"
                                        aria-label="I'm not a robot"
                                        className="sr-only"
                                        checked={status === 'checked'}
                                        disabled={isBusy}
                                        onChange={handleCaptchaChange}
                                    />
                                    <span aria-hidden="true" className={iconClass}>
                                        {status === 'checked' && <RecaptchaTick />}
                                    </span>
                                </label>
                            </div>
                            <label
                                htmlFor="checked-captcha"
                                className={`intro-captcha-label${isBusy ? ' is-disabled' : ''}`}
                            >
                                I&apos;m not a robot
                            </label>
                        </div>

                        <div className="intro-captcha-badge">
                            <img src={RecaptchaBadge} alt="reCAPTCHA" />
                            <span className="intro-captcha-badge-title">reCAPTCHA</span>
                            <span className="intro-captcha-badge-links">Privacy - Terms</span>
                        </div>
                    </div>
                </div>

                <div className="intro-captcha-copy">
                    <p>
                        This helps us to combat harmful conduct, detect and prevent spam and maintain the integrity of
                        our Products.
                    </p>
                    <p>
                        We&apos;ve used Google&apos;s reCAPTCHA Enterprise product to provide this security check. Your
                        use of reCAPTCHA Enterprise is subject to Google&apos;s Privacy Policy and Terms of Use.
                    </p>
                    <p>
                        reCAPTCHA Enterprise collects hardware and software information, such as device and application
                        data, and sends it to Google to provide, maintain, and improve reCAPTCHA Enterprise and for
                        general security purposes. This information is not used by Google for personalized advertising.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntroLoading;
