import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import { isMobile } from 'react-device-detect';
import MapView from '../components/MapView';
import RightView from '../components/RightView';
import IntroView from '../components/IntroView';
import CountryView from '../components/CountryView';

const cities = require('../../../cities.json');
const organizations = require('../../../organizations.json');
const countries = require('country-data').countries;

export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    let totalFunding = 0;
    for (const org of organizations) {
      totalFunding += org.amount;
    }
    this.state = {
      organizations: [],
      organizations_by_country: [],
      totalFunding,
      country: '',
      flag: '',
      left: false,
    };
  }
  getOrganizations(city) {
    const orgs = [];
    for (const org of organizations) {
      if (org.city_slug === city.toLowerCase()) {
        orgs.push(org);
      }
    }
    this.setState({
      organizations: orgs,
      left: true,
    });
    if (isMobile) {
      this.setState({
        organizations_by_country: [],
      });
    }
  }

  getOrganizationsByCountry(country) {
    const orgs = [];
    for (const org of organizations) {
      for (const item of cities) {
        if (item.slug === org.city_slug) {
          org.city = item.name;
        }
      }
      if (org.country.toLowerCase() === country.toLowerCase()) {
        orgs.push(org);
      }
    }
    this.setState({
      organizations_by_country: orgs,
      country: (countries[country]) ? countries[country].name : '',
      flag: (countries[country]) ? 'http://www.geognos.com/api/en/countries/flag/' + country + '.png' : '',
      left: (orgs.length !== 0),
    });
    if (isMobile) {
      this.setState({
        organizations: [],
      });
    }
  }

  getRightView() {
    const output = [];
    const orgs = this.state.organizations;
    let key = new Date().getTime();
    let index = 0;
    orgs.map(
      (org) => {
        key += index;
        index++;
        org.country = org.country.toUpperCase();
        const country = (countries[org.country]) ? countries[org.country].name : '';
        let city = '';
        for (const item of cities) {
          if (item.slug === org.city_slug) {
            city = item.name;
          }
        }
        output.push(<RightView key={key} organization={org} country={country} city={city} />);
      }
    );
    if (this.state.organizations_by_country.length) {
      key = new Date().getTime() + index;
      output.push(<CountryView key={key} flag={this.state.flag} organizations={this.state.organizations_by_country} country={this.state.country} />);
    }
    return (
      output
    );
  }

  render() {
    const scale = config.map_options.scale;
    const projectionConfig = config.map_options.projectionConfig;
    const zoomableGroup = config.map_options.zoomableGroup;
    const popScales = config.popScales;

    const topojson = '/topojson-maps/europe.topo.json';

    return (
      <div className="app-home">
        <AppBar position="static" style={{backgroundColor: '#4C454C'}}>
          <Toolbar>
            <Typography type="title" color="inherit" className="app-title">
              {config.app_title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="right-view">
          {
            ((this.state.organizations.length || this.state.organizations_by_country.length)) ?
              this.getRightView() :
              <IntroView totalFunding={this.state.totalFunding} />
          }
        </div>
        <MapView cities={cities} getDetail={(city) => this.getOrganizations(city)} getDetailByCountry={(country) => this.getOrganizationsByCountry(country)} organizations={organizations} scale={scale} popScales={popScales} topojson={topojson} projectionConfig={projectionConfig} zoomableGroup={zoomableGroup} />
        <Drawer open={this.state.left} onClose={() => this.setState({ left: false })} className="left-drawer">
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>{this.getRightView()}</div>
        </Drawer>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
