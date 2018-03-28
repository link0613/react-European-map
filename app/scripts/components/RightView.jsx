import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

export default class RightView extends React.PureComponent {
  static propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    organization: PropTypes.object.isRequired,
  };

  render() {
    const { city, country, organization } = this.props;
    return (
      <Card className="card">
        <CardContent>
          <div className="title">
            <img src={organization.image} alt="" />
            <div className="info">
              <Typography type="headline" component="h1">{organization.name}</Typography>
              <Typography type="headline" component="h2">{city}, {country}</Typography>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <div className="description">
            {organization.desc}
          </div>
          <div className="footer">
            <Typography type="headline" component="h1">EUR {new Intl.NumberFormat('en-US').format(organization.amount)} ({organization.year})</Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}
