"""Generate deterministic, original PCM audio for playback-only task demos."""
import math
from pathlib import Path
import random
import struct
import wave

SAMPLE_RATE = 16000
DURATION = 6
TONE_EVENTS = [(0.5, 1.45), (2.55, 3.5), (4.65, 5.55)]
BEAT_EVENTS = [(1.05, 2.2), (3.05, 4.2)]
OUTPUT = Path(__file__).resolve().parents[1] / 'assets' / 'demos'


def generate():
    rng = random.Random(77)
    tone, beat = [], []
    for i in range(SAMPLE_RATE * DURATION):
        t = i / SAMPLE_RATE
        a = b = 0.0
        for event, (start, end) in enumerate(TONE_EVENTS):
            if start <= t < end:
                local = t - start
                envelope = min(1, local / 0.025, (end - t) / 0.04)
                frequency = [660, 880, 740][event]
                a = 0.24 * envelope * (math.sin(2 * math.pi * frequency * local)
                      + 0.18 * math.sin(4 * math.pi * frequency * local))
        for start, end in BEAT_EVENTS:
            if start <= t < end:
                local = (t - start) % 0.23
                envelope = min(1, local / 0.003) * math.exp(-local * 42)
                release = min(1, (end - t) / 0.015)
                kick = math.sin(2 * math.pi * (145 * local - 100 * local * local))
                b = release * envelope * (0.24 * kick + 0.065 * rng.uniform(-1, 1))
        tone.append(round(a * 32767))
        beat.append(round(b * 32767))
    mixture = [a + b for a, b in zip(tone, beat)]
    assert max(abs(v) for v in mixture) < 32767, 'Mixture must not clip'
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, samples in [('tone', tone), ('beat', beat), ('mixture', mixture)]:
        with wave.open(str(OUTPUT / f'{name}.wav'), 'wb') as out:
            out.setnchannels(1)
            out.setsampwidth(2)
            out.setframerate(SAMPLE_RATE)
            out.writeframes(struct.pack(f'<{len(samples)}h', *samples))
    print('Generated three 6-second mono WAV files; mixture equals source A + source B.')


if __name__ == '__main__':
    generate()
