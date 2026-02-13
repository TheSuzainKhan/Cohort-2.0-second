const mouseFollower = document.querySelector(".mouse-follower")

let x = 0, y = 0

addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e

    // console.log(clientX,clientY);

    // mouseFollower.style.top = clientY + "px"
    // mouseFollower.style.left = clientX + "px"

    // mouseFollower.style.transform = `translate(${clientX}px, ${clientY}px)` // transform se puri website dubara se re-render/ recalculate nhi hoti bas jo change kiya he usme hi change hota he, lekin top,left se puri website recalculate/ rerender hoti thi isliye ye use kiya performance achi hone ke liye.

    x = clientX
    y = clientY

    // far()

})

function far() {
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`
    // console.log("hello");
    
    requestAnimationFrame(far) //ye har frame ke execute hone se pehle far function chalega.
}
far()