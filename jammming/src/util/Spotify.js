

const clientId = '380e357d17e1453cae060423dc206ae7';

let userToken;
let redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (userToken) {
      return userToken;
    }
        let accessToken = window.location.href.match(/access_token=([^&]*)/);
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {

      userToken = accessToken[1];
      expiresIn = expiresIn[1];
      window.setTimeout(() => userToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user-read-private%20playlist-modify-public&show_dialog=false`
    }
  },



  search(term) {
    this.getAccessToken();
    if (userToken) {
      return fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
    headers: {
      'Authorization': 'Bearer ' + userToken,

    }
    }).then(response => {
      if (response.ok) {

        return response.json();
      }
      throw new Error('Request failed!');
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        ));
      }

    });
  }
},

createPlaylist(playlistName, tracks) {
  if (!playlistName && !tracks) {
    return;
  }
  let userID;
  console.log(playlistName);

  if (userToken) {
    return fetch('https://api.spotify.com/v1/me', {headers: {'Authorization': 'Bearer ' + userToken}}).then(response => {
      if (response.ok) {
        console.log(tracks);
        return response.json();

      }
    }).then(jsonResponse => {
      userID = jsonResponse.id;
      console.log(userID);
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
  headers: {
    'Authorization': 'Bearer ' + userToken,
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({name: playlistName})
  }).then(response => {
    console.log(response)
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)).then(jsonResponse => {
    if (jsonResponse.id) {
      console.log(jsonResponse);
      let playlistID = jsonResponse.id;
      console.log(playlistID);
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
  headers: {
    'Authorization': 'Bearer ' + userToken,
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({"uris": tracks})
}).then(response => {
  if (response.ok) {
    console.log(response)
    return;
  }

})

}})})}
}
};

export default Spotify;
