/**
 * Created by Leon on 2-11-2015.
 */

/*
google.load("visualization", "1", {packages:["map"]});
google.setOnLoadCallback(drawMap);

function drawMap() {
    //var opts = {sendMethod: 'auto'};
    var query = new google.visualization.Query('https://goldhill.nl/weatherx.csv');

    //query.setQuery('select name, latitude, longitude');

    // Send the query with a callback function.
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = google.visualization.arrayToDataTable(response);
    console.log("Hallo!");
    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {showTip: true});
}


*/


/**
 * A demo servlet for serving a simple, constant data table.
 * This servlet extends DataSourceServlet, but does not override the default
 * empty implementation of method getCapabilities(). This servlet therefore ignores the
 * user query (as passed in the 'tq' url parameter), leaving the
 * query engine to apply it to the data table created here.
 *
 * @author Nimrod T.
 */
public class CsvDataSourceServlet extends DataSourceServlet {

    /**
     * Log.
     */
    private static final Log log = LogFactory.getLog(CsvDataSourceServlet.class.getName());

    /**
     * The name of the parameter that contains the url of the CSV to load.
     */
    private static final String URL_PARAM_NAME = "url";

    /**
     * Generates the data table.
     * This servlet assumes a special parameter that contains the CSV URL from which to load
     * the data.
     */
    public DataTable generateDataTable(Query query, HttpServletRequest request)
    throws DataSourceException {
        String url = request.getParameter(URL_PARAM_NAME);
        if (StringUtils.isEmpty(url)) {
            log.error("url parameter not provided.");
            throw new DataSourceException(ReasonType.INVALID_REQUEST, "url parameter not provided");
        }

        Reader reader;
        try {
            reader = new BufferedReader(new InputStreamReader(new URL(url).openStream()));
        } catch (MalformedURLException e) {
            log.error("url is malformed: " + url);
            throw new DataSourceException(ReasonType.INVALID_REQUEST, "url is malformed: " + url);
        } catch (IOException e) {
            log.error("Couldn't read from url: " + url, e);
            throw new DataSourceException(ReasonType.INVALID_REQUEST, "Couldn't read from url: " + url);
        }
        DataTable dataTable = null;
        ULocale requestLocale = DataSourceHelper.getLocaleFromRequest(request);
        try {
            // Note: We assume that all the columns in the CSV file are text columns. In cases where the
            // column types are known in advance, this behavior can be overridden by passing a list of
            // ColumnDescription objects specifying the column types. See CsvDataSourceHelper.read() for
            // more details.
            dataTable = CsvDataSourceHelper.read(reader, null, true, requestLocale);
        } catch (IOException e) {
            log.error("Couldn't read from url: " + url, e);
            throw new DataSourceException(ReasonType.INVALID_REQUEST, "Couldn't read from url: " + url);
        }
        return dataTable;
    }
}