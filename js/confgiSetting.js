var seeting = {
    // 开关
    switch: `<div class="grid-stack-item-content">
    <div class="switchingBox">
        <div class="switchingBox_title">1#电动机</div>
        <div id="switchDom "  data-type="yes" class="switchCode  switchCodeYes">
            <div class="solidSwitch"></div>
            <div class="switchCodeMsg ">NO</div>
        </div>
        <div class="switchIcon"></div>
    </div>
</div>`

}


function switchId(keyID) {
    return `
    <div class="grid-stack-item-content">
    <div class="switchingBox">
        <div class="switchingBox_title">1#电动机</div>
        <div id="${keyID}" data-type="yes" class="switchCode  switchCodeYes">
            <div class="solidSwitch"></div>
            <div class="switchCodeMsg ">NO</div>
        </div>
        <div class="switchIcon"></div>
    </div>
</div>
    `
}