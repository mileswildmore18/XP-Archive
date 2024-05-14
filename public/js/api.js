// Get RAWG API Game data -Emanuel
function getAPI () {
    fetch(reqURL).then(function (res){
        console.log(res);
        return res.json();
    }).catch(function(err){
        console.error(err);
    })
  }
const btn = document.getElementById('games');
  
btn.addEventListener('click', getAPI);