const test = require('ava');
const sharp = require('sharp');
const { osmsm } = require('../src/lib');

test('static map from geojson as png', async (t) => {
  const imageBuffer = await osmsm({
    geojson: '{"type":"Point","coordinates":[-105.01621,39.57422]}',
  });

  const metadata = await sharp(imageBuffer).metadata();

  t.is(metadata.width, 800, 'image width');
  t.is(metadata.height, 600, 'image height');
  t.is(metadata.format, 'png', 'image format');
});

test('static map from center as jpeg', async (t) => {
  const imageBuffer = await osmsm({
    center: '-105.01621,39.57422',
    zoom: 12,
    width: 1280,
    height: 720,
    type: 'jpeg'
  });

  const metadata = await sharp(imageBuffer).metadata();

  t.is(metadata.width, 1280, 'image width');
  t.is(metadata.height, 720, 'image height');
  t.is(metadata.format, 'jpeg', 'image format');
});
