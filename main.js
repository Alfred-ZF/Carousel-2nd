let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0




makeFakeSlides()
$slides.css({transform: 'translateX(-400px)'})
bindEvents()
$('#next').on('click',function(){
  goToSlide(current+1)
})
$('#previous').on('click',function(){
  goToSlide(current-1)
})

let timer = setInterval(function(){
  goToSlide(current+1)
},1500)

$('#container').on('mouseenter',function () {
  window.clearInterval(timer)
}).on('mouseleave',function () {
  timer = setInterval(function(){
    goToSlide(current+1)
  },1500)
})

function makeFakeSlides() {
  let $firstClone = $images.eq(0).clone(true)
  let $lastClone = $images.eq($images.length - 1).clone(true)
  $slides.append($firstClone)
  $slides.prepend($lastClone)
}

function bindEvents() {
  $('#buttonWrapper').on('click','button',function(e){
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}

function goToSlide(index) {
  if (index > $buttons.length - 1) {
    index = 0
  }else if(index < 0){
    index = $buttons.length - 1
  }
  if (current === $buttons.length -1 && index === 0 ) {
    //从最后一张到第一张
    console.log("走了1");
    console.log("current 是" + current);
    console.log("index 是" + index);
    
    $slides.css({
      transform: `translateX(${-($buttons.length + 1)*400}px)`
    })
    .one('transitionend', function () {
      console.log('动画完毕');
      $slides.hide()
        .offset()
      $slides.css({
          transform: `translateX(${-(index + 1)*400}px)`
        })
        .show()
    })
    current = index
  }else if (current === 0 && index === $buttons.length - 1 ) {
    //从第一张到最后一张
    console.log("走了2");
    console.log("current是" + current);
    console.log("index是" + index);
    
    $slides.css({
      transform: `translateX(0px)`
    })
    .one('transitionend', function () {
      $slides.hide()
        .offset()
      $slides.css({
          transform: `translateX(${-(index+1)*400}px)`
        })
        .show()
    })
    current = index
  }else{
    console.log("走了3");
    console.log("current 是" + current);
    console.log("index 是" + index);
    
    
    $slides.css({
      transform: `translateX(${-(index+1)*400}px)`
    })
    current = index
  }
}

