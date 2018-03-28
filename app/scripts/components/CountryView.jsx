import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

export default class CountryView extends React.PureComponent {
  static propTypes = {
    country: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    organizations: PropTypes.array.isRequired,
  };

  render() {
    const { country, flag, organizations } = this.props;
    let totalFunding = 0;
    for (const org of organizations) {
      totalFunding += org.amount;
    }
    return (
      <Card className="card">
        <CardContent>
          <div>
            <h3 style={{ float: 'left' }}>{country}</h3>
            <img src={flag} alt="" style={{ float: 'right' }} width={50} />
          </div>
          <div style={{ clear: 'both' }} />
          {
            organizations.map((organization, i) => (
              (!organization.city) &&
              (<div key={i}>
                <div className="title" style={{ paddingTop: 0 }}>
                  <img src={organization.image} alt="" />
                  <div className="info">
                    <Typography type="headline" component="h1">{organization.name} { organization.city && (<span>({organization.city})</span>)}</Typography>
                  </div>
                </div>
                <div className="description" style={{ margin: '10px 0 15px 0' }}>
                  {organization.desc}<br/>
                  <b>Funding: EUR {new Intl.NumberFormat('en-US').format(organization.amount)} ({organization.year})</b>
                </div>
              </div>)
            ))
          }
          <div className="footer">
            <Typography type="headline" component="h1">Total Funding so far: {new Intl.NumberFormat('en-US').format(totalFunding)} &euro;</Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}
