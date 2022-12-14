import { createVNode } from './virtual-dom.js'

const file_association = {
    1: '01.mp3',
    2: '02.mp3',
    3: '03.mp3',
    4: '04.mp3',
    5: '05.mp3',
    6: '06.mp3',
    7: '07.mp3',
    8: '08.mp3',
    9: '09.mp3',
    10: '10.mp3',
}

export default {
    createHtml: () => {
        let audio_elements = []
        for (let id in file_association) {
            audio_elements.push(createVNode('audio', {
                class: 'audio_item',
                id: 'audio_' + id,
                src: 'audio/' + file_association[id],
            }, []))
        }
        return audio_elements
    },
    play: (id) => {
        let audio = document.querySelector('[id^=audio_' + id + ']')
        if (audio) {
            audio.volume = 100 / 100
            audio.currentTime = 0
            audio.play()
        }
    },
    stop: () => {
        console.log('stop')
    },
}