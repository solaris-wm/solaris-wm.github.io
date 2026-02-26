function safePlay(video) {
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function() {});
    }
}

function primeSectionVideos(sectionEl, controls) {
    if (controls && typeof controls.playAll === 'function') {
        controls.playAll();
        return;
    }
    sectionEl.querySelectorAll('video').forEach(safePlay);
}

function replaceVideoSources(sourceEls, replacer) {
    sourceEls.forEach(function(src) {
        var current = src.getAttribute('src');
        src.setAttribute('src', replacer(current));
        src.parentElement.load();
    });
}

function swapCuratedSourcePath(currentPath, annotated, pairs) {
    for (var i = 0; i < pairs.length; i++) {
        var from = annotated ? pairs[i][0] : pairs[i][1];
        var to = annotated ? pairs[i][1] : pairs[i][0];
        if (currentPath.indexOf(from) !== -1) {
            return currentPath.replace(from, to);
        }
    }
    return currentPath;
}

function toggleSection(bodyId, arrowId) {
    var b = document.getElementById(bodyId);
    var a = document.getElementById(arrowId);
    if (!b || !a) return;

    var isHidden = getComputedStyle(b).display === 'none';
    if (!isHidden) {
        b.style.display = 'none';
        a.classList.remove('expanded');
        return;
    }

    b.style.display = 'block';
    a.classList.add('expanded');
    var grid = b.querySelector('.video-gallery-grid');
    if (grid && !grid._videoControls) {
        grid._videoControls = createVideoControls(grid, { fps: 20, autoplay: false }) || null;
    }

    // Browsers can block autoplay in initially hidden sections. Prime each
    // section once on first expand so future toggles resume naturally.
    if (!b.dataset.videosPrimed) {
        primeSectionVideos(b, grid && grid._videoControls);
        b.dataset.videosPrimed = 'true';
    }
}
function toggleCuratedActions(checkbox, gridId) {
    var grid = document.getElementById(gridId);
    if (!grid) return;

    var videos = grid.querySelectorAll('video source');
    var annotated = checkbox.checked;
    var pairs = [
        ['static/videos_test_split/uncurated_unannotated/', 'static/videos_test_split/uncurated_annotated/'],
        ['static/videos_eval_split/co_observation_unannotated/', 'static/videos_eval_split/co_observation_annotated/']
    ];
    replaceVideoSources(videos, function(current) {
        return swapCuratedSourcePath(current, annotated, pairs);
    });
}
function toggleQualitativeActions(checkbox, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var videos = container.querySelectorAll('video source');
    var annotated = checkbox.checked;
    var pattern = annotated ? /\.mp4$/ : /_annotations\.mp4$/;
    var replacement = annotated ? '_annotations.mp4' : '.mp4';
    replaceVideoSources(videos, function(current) {
        return current.replace(pattern, replacement);
    });
}

var uncuratedGallery=(function(){
    var START=128,END=191,PER_PAGE=4,page=0,annotated=false,
        grid=document.getElementById('uncurated-grid'),
        pager=document.getElementById('uncurated-pager'),
        total=END-START+1,pages=Math.ceil(total/PER_PAGE);
    function folder(){return annotated?'uncurated_annotated':'uncurated_unannotated'}
    var controlBar=null;
    function render(){
        if(controlBar){controlBar.remove();controlBar=null;}
        grid._videoControls = null;
        grid.innerHTML='';
        var from=START+page*PER_PAGE,to=Math.min(from+PER_PAGE-1,END);
        for(var i=from;i<=to;i++){
            var d=document.createElement('div');d.className='gallery-item';
            var v=document.createElement('video');
            v.loop=v.muted=v.playsInline=true;v.preload='metadata';
            var s=document.createElement('source');
            s.src='static/videos_test_split/'+folder()+'/video_'+i+'_side_by_side.mp4';
            s.type='video/mp4';v.appendChild(s);
            d.appendChild(v);grid.appendChild(d);
        }
        var ctrl=createVideoControls(grid,{fps:20,autoplay:false});
        if(ctrl){grid._videoControls=ctrl;controlBar=ctrl.bar;}
        var uncuratedBody = document.getElementById('uncurated-body');
        var isVisible = uncuratedBody && getComputedStyle(uncuratedBody).display !== 'none';
        if (isVisible) {
            primeSectionVideos(grid, grid._videoControls);
        }
        pager.innerHTML='';
        var prev=document.createElement('button');prev.textContent='← Prev';prev.disabled=page===0;
        prev.onclick=function(){page--;render()};
        var next=document.createElement('button');next.textContent='Next →';next.disabled=page>=pages-1;
        next.onclick=function(){page++;render()};
        var info=document.createElement('span');
        info.textContent='Page '+(page+1)+' / '+pages;
        pager.appendChild(prev);pager.appendChild(info);pager.appendChild(next);
    }
    render();
    return{
        toggleActions:function(c){annotated=c;render()},
        render:render
    };
})();
