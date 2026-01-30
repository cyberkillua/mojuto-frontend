export const IO = (item: HTMLElement, options: IntersectionObserverInit): Promise<void> => {
    return new Promise((resolve) => {
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resolve(void 0);
                }
            });
        }, options);
        observer.observe(item);
    });
};
