# Qatar Charity Europe Funding

Map to display funding of Qatar Charity around Europe.

- Mockup: https://app.moqups.com/qceu/RjhMKce77K/view
- Data source: https://docs.google.com/spreadsheets/d/1XSMFslxz6zzjRcgmm3QeWbjJzR9wte9KQkyYwn_pU7k/edit#gid=0

## Corporate identiy
- dark blue `#0f2688`
- *Orange* from [here](http://www.material-ui.com/#/customization/colors),
- text color: dark grey `#212121`
- font: Roboto, sans-serif (official Material-UI fonts)

## Data

### `organizations.json`
Data for each organization that got funded. If `city_slug` is empty it only shows up when the user selects the country

- `id`: unique ID for organization that got funded.
- `country`: ISO 3166-1 alpha-2 code for the organization country.
- `city_slug`: slug of organization city. Maps to `cities.json`
- `name`: Organization name
- `desc`: Description of funding.
- `year`: Year of funding.
- `amount`: Funding amount in EUR.
- `image`: Logo or image to be displayed with organization.

### `cities.json`
Location mapping for cities. Maps to `city_slug` in `organizations.json`.

- `slug`: normalized city name. As used in `organizations.json`
- `name`: full city name to be shown to user.
- `lat` and `lon`: Coordinates for correct placement on map.


## Install
- Steps to set up project: xxx


