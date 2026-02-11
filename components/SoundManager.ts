/**
 * Sound Manager for L-Pro UI
 * Provides subtle audio feedback for a "Dumbfounding" experience.
 */

const sounds = {
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Subtle digital click
    click: 'https://www.soundjay.com/buttons/sounds/button-37.mp3', // Soft mechanical click
};

class SoundManager {
    private static instance: SoundManager;
    private audioCache: Map<string, HTMLAudioElement> = new Map();
    private enabled: boolean = true;

    private constructor() {
        // Preload sounds
        Object.values(sounds).forEach(url => {
            const audio = new Audio(url);
            audio.volume = 0.05; // Keep it very subtle as requested
            this.audioCache.set(url, audio);
        });
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    public play(soundName: keyof typeof sounds) {
        if (!this.enabled) return;

        const url = sounds[soundName];
        const audio = this.audioCache.get(url);

        if (audio) {
            // Clone audio to allow overlapping sounds
            const playInstance = audio.cloneNode() as HTMLAudioElement;
            playInstance.volume = 0.05;
            playInstance.play().catch(() => {
                // Handle browsers blocking autoplay before user interaction
            });
        }
    }

    public setEnabled(status: boolean) {
        this.enabled = status;
    }
}

export const soundManager = SoundManager.getInstance();
