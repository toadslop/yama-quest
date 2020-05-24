import WebMercatorViewport from 'viewport-mercator-project';
import bbox from '@turf/bbox';
import { Map } from 'mapbox-gl';

export const fitViewportToFeature = (map, feature, options = {}) => {
    /** Invariants */
    if (!feature)
        throw Error('You must pass a feature to fitMapToFeature');
    if (!map)
        throw Error("Map hasn't loaded yet, be patient.");
    /** Get bounding box of feature/collection */
    const bounds = bbox(feature);
    /** Setup WebMercatorViewport instances to fit bounds */
    const { clientWidth, clientHeight } = map.getContainer();
    const viewport = new WebMercatorViewport({ width: clientWidth, height: clientHeight });
    /** Edge case: if width is less than horizontal padding, remove padding */
    if (typeof options.padding === 'object' &&
        clientWidth < (options.padding.left || 0) + (options.padding.right || 0)) {
        options.padding = 0;
        console.warn('map width is less than padding width, resetting to 0px');
    }
    /** Edge case: if width is less than vertical padding, remove padding */
    if (typeof options.padding === 'object' &&
        clientHeight < (options.padding.top || 0) + (options.padding.bottom || 0)) {
        options.padding = 0;
        console.warn('map height is less than padding height, resetting to 0px');
    }
    /** Fit the bounds we found to the new viewport and return it */
    return viewport.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
    ], options);
};
