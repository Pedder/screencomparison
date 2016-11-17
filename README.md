
# Screenshot Comparison

Easy way to compare two versions of the same pages in different screen sizes.  

## Installation / setup
```
brew install imagemagick
npm install phantomjs
npm install colors
```

Probably
npm install -g gm

## 1. Create the screenshot
```
phantomjs screen.js
```
creates the Screenshot in screens/{current-time}

## 2. Create the screenshot of the other version
```
phantomjs screen.js
```
Run again screenshot the other version

## 3. Run the comparison
```
node comparelist.js
```
Will automatically take last to folders 

## 4. The result

/compared/{first-time-screenshoots}-{second-time-screenshoots}
