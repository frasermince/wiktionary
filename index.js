const URL = require('url')
const flat = require('flat')
const {get: getProp} = require('lodash')
const cheerio = require('react-native-cheerio')


async function lookup (query, locale = 'en', language) {
  // Example query
  // https://en.wiktionary.org/w/api.php?action=query&prop=extracts&titles=pomology&format=json

  const url = URL.format({
    protocol: 'https',
    hostname: `${locale}.wiktionary.org`,
    pathname: `api/rest_v1/page/definition/${query}`
  })

  const response = await fetch(url, 
    {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  const body = await response.json()
  if (body[language] == undefined) {
    return [];
  } else {
    return body[language];
  }
}

module.exports = lookup
