import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import { isMobile } from 'react-device-detect';

const position = {
  top: [0, -30],
  right: [15, 5],
  bottom: [0, 25],
  left: [-50, 5],
};

// mostly from http://www.colourlovers.com/palette/4520019/Watered
const noOrgCountryColor = '#F9F7F7',
      orgCountryColor = '#CAC2B7',
      orgCountryMouseOverColor = '#ADA493',
      cityLabelColor = '#041C28',
      cityMarkerFill = '#8A1538', //Qatar flag
      cityMarkerFillActive = '#4C454C';

import { scaleLinear } from 'd3-scale';

export default class MapView extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.array.isRequired,
    getDetail: PropTypes.func.isRequired,
    getDetailByCountry: PropTypes.func.isRequired,
    organizations: PropTypes.array.isRequired,
    popScales: PropTypes.object.isRequired,
    projectionConfig: PropTypes.object.isRequired,
    scale: PropTypes.object.isRequired,
    topojson: PropTypes.string.isRequired,
    zoomableGroup: PropTypes.object.isRequired,
  };

  getPopScale(country_id) {
    const { organizations, popScales } = this.props;
    const popScale = scaleLinear()
      .domain(popScales.domain)
      .range(popScales.range);

    let fund = 0;
    for (const org of organizations) {
      if (org.country.toLowerCase() === country_id.toLowerCase()) {
        fund += Number(org.amount);
      }
    }
    if (fund > 0) {
      return orgCountryColor;
    } else {
      return noOrgCountryColor;
    }
    //return popScale(fund);
  }

  getPopScaleHover(country_id) {
    const { organizations } = this.props;
    let color = noOrgCountryColor;
    for (const org of organizations) {
      if (org.country.toLowerCase() === country_id.toLowerCase()) {
        color = orgCountryMouseOverColor;
      }
    }
    return color;
  }

  getOrgs(city) {
    this.props.getDetail(city);
  }

  getOrgsByCountry(country) {
    this.props.getDetailByCountry(country);
  }

  render() {
    const { topojson, cities, scale, projectionConfig, zoomableGroup } = this.props;
    const cityScale = scaleLinear().domain(scale.domain)
      .range(scale.range);
    return (
      <ComposableMap
        projectionConfig={projectionConfig}
        width={980}
        height={551}
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <ZoomableGroup center={zoomableGroup.center} >
          <Geographies geography={topojson}>
            {(geographies, projection) =>
              geographies.map((geography, i) =>
                (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    onClick={() => this.getOrgsByCountry(geography.id)}
                    onMouseEnter={() => this.getOrgsByCountry(geography.id)}
                    onMouseLeave={() => {
                      if (!isMobile) this.getOrgsByCountry('');
                    }}
                    style={{
                      default: {
                        fill: this.getPopScale(geography.id),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: this.getPopScaleHover(geography.id),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#ECEFF1',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                ))}
          </Geographies>
          <Markers>
            {
              cities.map((city, i) => (
                <Marker
                  key={i}
                  marker={{ coordinates: [city.lon, city.lat] }}
                  onClick={() => this.getOrgs(city.slug)}
                  onMouseEnter={() => this.getOrgs(city.slug)}
                  onMouseLeave={() => {
                    if (!isMobile) this.getOrgs('');
                  }}
                  style={{
                    default: { fill: cityMarkerFill },
                    hover: { fill: cityMarkerFillActive },
                    pressed: { fill: cityMarkerFillActive },
                  }}
                >
                  <circle
                    cx={0}
                    cy={0}
                    // r={cityScale(15000000)}
                    r={8}
                    // fill="rgba(255,87,34,0.8)"
                    stroke="#607D8B"
                    strokeWidth="2"
                  />
                  {
                    (city.label_position === 'right') ?
                      (<text
                        x={position[city.label_position][0]}
                        y={position[city.label_position][1]}
                        style={{
                          fontSize: 13,
                          fontFamily: 'Roboto, sans-serif',
                          fill: cityLabelColor,
                        }}
                      >
                        {city.name}
                      </text>) :
                      (<text
                        textAnchor="middle"
                        x={position[city.label_position][0]}
                        y={position[city.label_position][1]}
                        style={{
                          fontSize: 13,
                          fontFamily: 'Roboto, sans-serif',
                          fill: cityLabelColor,
                        }}
                      >
                        {city.name}
                      </text>)
                  }
                </Marker>
              ))
            }
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}
