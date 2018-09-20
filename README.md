# Visual Traceroute
Visual Traceroute is a tool to visualize the result of a traceroute in a map.

![Visual Traceroute](docs/images/base.png)

# How it Works
By a given host/domain the gathered information from the traceroute (addresses), is used to find each hop location with ip2location, and afterward, the route is applied to a map with a path and markers with the hop information.

# How to Use it?
You can use it locally (tracing the route from your own network) or through www.visualtraceroute.network (under development).

## Locally

1. Clone the project
```
$ git clone https://github.com/andrejesuscm/visualtraceroute.git 
```

2. Install dependencies
```
$ npm install
```

3. run it!
```
$ npm run visualtraceroute
```

## Features

### Hops List
![Hops List](docs/images/results-panel.png)

On the results panel, you can see the hops list were you the hop number, host, country and response times can be seen.

### Map markers
![Map Markers](docs/images/map-markers.png)

You can have a visually understand the location of each host. When there is too many markers close together, they will get clustered and a bigger marker will appear with the number of clustered items inside. when clicking in the cluster, the map will zoom in in order to expand them.

![Map Markers Cluster](docs/images/spider.png)

Whenever there are multiple hops in the same location we will have them also clustered in a bigger maker and when clicked we can visualize them in a spider web way.

![Map Markers Popups](docs/images/popup.png)

When clicked in the hop markers, we can view more detailed information on a popup.



## From www.visualtraceroute.network
(under development)

