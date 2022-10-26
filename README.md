# Render AXA Health Insurance Members
This is a small utility to render AXA's health insurance network members on a map. It accomplishes this by converting the official data from JSON to CSV. Then, these CSV files would be manually imported to a custom map generated in [Google My Maps]. The end result is [here][Final Map].

## Requirements
- Unix-like system.
- Tested on Node.js `v16.18.0`.

## Usage
- Clone this repository:

      git clone git@github.com:ugultopu/Render-AXA-Health-Insurance-Members.git

- Change directory into it:

      cd Render-AXA-Health-Insurance-Members

- Now, you need to acquire the data and put it into a file named `response.json`. You can do this either by utilizing the developer tools of your browser from [the right web page](https://www.axasigorta.com.tr/anlasmali-saglik-kurumlari), or you can use the script in `fetch-institions`. To use the script:

  - `cd fetch-institutions`
  - Edit `request-body.json` as necessary.
  - `./request.sh`

- After acquiring the data, you are ready to generate the map data. To do so, run:

      node json-to-csv.js

  Now, the CSV files that are associated with each member type (hospital, clinic, etc.) should be in a directory named `map-data`.

- Now, you can import each CSV file as a separate layer in [Google My Maps]. To do so, you can follow [this tutorial](https://www.google.com/earth/outreach/learn/visualize-your-data-on-a-custom-map-using-google-my-maps). The end result is [here][Final Map].

- After importing the data, if Google My Maps tells you that there are missing data, you can examine which data are missing and manually fix them in the `response.json` file. After doing so, you can run the script again to re-generate the CSV files. Then, you can remove the existing layers in Google My Maps and add them back using the re-generated CSV files.

[Google My Maps]: https://mymaps.google.com
[Final Map]: https://www.google.com/maps/d/viewer?mid=1939Wg-7uHxzOnBzrHWKl6UBPY3R8Nvg
