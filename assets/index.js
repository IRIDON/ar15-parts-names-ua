import imageMapResize from 'image-map-resizer';

import './styles/base.scss';
import image from '../source/ar-15-exploded-view-new.png';

const mapId = 'ar15MapImg';
const mapPanel = '.js-mapPanel';
const mapPanelToogle = '.js-mapPanelToogle';
const mapPanelShowClass = '__show';

const ArMap = () => {
    const $map = document.getElementById(mapId);
    const $mapAres = $map.querySelectorAll('area');
    const $panels = document.querySelectorAll(mapPanelToogle);

    const openTargetPanel = ($element) => {
        if (!$element) {
            return;
        }

        for (const $panel of document.querySelectorAll(mapPanel)) {
            $panel.classList.remove(mapPanelShowClass);
        }

        $element.parentElement.classList.add(mapPanelShowClass);
    };

    const addPanelLisener = (e) => {
        const { target } = e;

        target.parentElement.classList.toggle(mapPanelShowClass);
    };

    const addMapLisener = (e) => {
        const { target } = e;
        const id = target.hash.replace('#', '');
        const $block = document.querySelector(`a[name="${id}"]`);

        openTargetPanel($block);
    };

    imageMapResize($map);

    for (const $panel of $panels) {
        $panel.addEventListener('click', addPanelLisener);
    }

    for (const $area of $mapAres) {
        $area.addEventListener('click', addMapLisener);
    }
}


ArMap();