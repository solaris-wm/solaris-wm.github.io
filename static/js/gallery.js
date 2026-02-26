var curatedControlBars = {};
function toggleCuratedSection(bodyId, arrowId) {
    var b = document.getElementById(bodyId);
    var a = document.getElementById(arrowId);
    var isHidden = getComputedStyle(b).display === 'none';
    if (isHidden) {
        b.style.display = 'block';
        a.classList.add('expanded');
        // Lazy-init video controls on first expand
        var grid = b.querySelector('[id^="curated-grid"]');
        if (grid && !curatedControlBars[grid.id]) {
            var ctrl = createVideoControls(grid, { fps: 20, autoplay: false });
            if (ctrl) curatedControlBars[grid.id] = ctrl.bar;
        }
    } else {
        b.style.display = 'none';
        a.classList.remove('expanded');
    }
}
function toggleCuratedActions(checkbox, gridId) {
    var grid = document.getElementById(gridId);
    var videos = grid.querySelectorAll('video source');
    var annotated = checkbox.checked;
    var pairs = [
        ['static/videos_test_split/uncurated_unannotated/', 'static/videos_test_split/uncurated_annotated/'],
        ['static/videos_eval_split/co_observation_unannotated/', 'static/videos_eval_split/co_observation_annotated/']
    ];
    videos.forEach(function(src) {
        var current = src.getAttribute('src');
        for (var i = 0; i < pairs.length; i++) {
            var from = annotated ? pairs[i][0] : pairs[i][1];
            var to = annotated ? pairs[i][1] : pairs[i][0];
            if (current.indexOf(from) !== -1) {
                src.setAttribute('src', current.replace(from, to));
                break;
            }
        }
        src.parentElement.load();
    });
}
function toggleQualitativeActions(checkbox, containerId) {
    var container = document.getElementById(containerId);
    var videos = container.querySelectorAll('video source');
    var annotated = checkbox.checked;
    videos.forEach(function(src) {
        var current = src.getAttribute('src');
        if (annotated) {
            src.setAttribute('src', current.replace(/\.mp4$/, '_annotations.mp4'));
        } else {
            src.setAttribute('src', current.replace(/_annotations\.mp4$/, '.mp4'));
        }
        src.parentElement.load();
    });
}

var uncuratedGallery=(function(){
    var START=128,END=191,PER_PAGE=window.innerWidth<=767?4:8,page=0,annotated=false,
        grid=document.getElementById('uncurated-grid'),
        pager=document.getElementById('uncurated-pager'),
        total=END-START+1,pages=Math.ceil(total/PER_PAGE);
    var observer=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            if(!e.isIntersecting)return;
            var v=e.target,src=v.dataset.src;
            if(src){var s=document.createElement('source');s.src=src;s.type='video/mp4';v.appendChild(s);v.load();delete v.dataset.src;}
            observer.unobserve(v);
        });
    },{rootMargin:'200px'});
    function folder(){return annotated?'uncurated_annotated':'uncurated_unannotated'}
    var controlBar=null;
    function render(){
        if(controlBar){controlBar.remove();controlBar=null;}
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
        if(ctrl)controlBar=ctrl.bar;
        pager.innerHTML='';
        var prev=document.createElement('button');prev.textContent='← Prev';prev.disabled=page===0;
        prev.onclick=function(){if(page>0){page--;render()}};
        var next=document.createElement('button');next.textContent='Next →';next.disabled=page>=pages-1;
        next.onclick=function(){if(page<pages-1){page++;render()}};
        var info=document.createElement('span');
        info.textContent='Page '+(page+1)+' / '+pages;
        pager.appendChild(prev);pager.appendChild(info);pager.appendChild(next);
    }
    render();
    return{toggleActions:function(c){annotated=c;render()},render:render};
})();
