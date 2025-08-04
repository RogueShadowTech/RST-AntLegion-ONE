const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const GITHUB_TOKEN = process.env.GH_PAT;
  const repoOwner = 'RogueShadowTech';
  const repoName = 'RST-AntLegion-ONE';

  try {
    const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'trigger_save' })
    });

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Dispatch sent successfully!' })
      };
    } else {
      const error = await res.json();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: error.message || 'Dispatch failed' })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Unexpected error' })
    };
  }
};
