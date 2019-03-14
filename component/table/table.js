class Table {
  constructor(el){
    this.container = document.getElementById(el);
    this.table = null;
    this.tableTr = null;
    this.tableScrollY = null;
    this.tableScrollX = null;
    this.table = null;
    this.deafultThead = [{}, {}, {}];
    this.deafultTbody = [{}, {}, {}];
    this.init();
  }
  init(){
    this.container.innerHTML = this.renderTable();
    this.table = document.getElementById('tableIpt');
    this.renderScroll();
    this.addEvent();
  }
  renderTable(el){
    return `
      <div class="table-box">
        <table contenteditable="true" id="tableIpt">${this.renderTr()}</table>
        <div class="table-scroll-x" id="table-scroll-x"></div>
        <div class="table-scroll-y" id="table-scroll-y"></div>
        <div class="table-scroll-round"></div>
     </div>
    `
  }
  renderTr(){
    let str = '';
    this.deafultTbody.map(item => {
      str += `<tr>${this.renderTag(item)}</tr>`;
    })
    return str;
  }
  renderTag(record){
    let str = '';
    this.deafultThead.map((item, index) => {
      const key = item.key || index;
      str += `<th>${record[key] || ''}</th>`;
    })
    return str;
  }
  renderScroll(){
    this.tableTr = this.container.getElementsByTagName('tr');
    this.tableTh = this.tableTr[0].getElementsByTagName('th');
    this.tableScrollY = document.getElementById('table-scroll-y');
    this.tableScrollX = document.getElementById('table-scroll-x');
    this.tableScrollY.innerHTML = this.renderScrollTags('y', this.getStyles(this.tableTr));
    this.tableScrollX.innerHTML = this.renderScrollTags('x', this.getStyles(this.tableTh));
  }
  renderScrollTags(type, styles){
    let arr = type === 'y' ? this.deafultTbody: this.deafultThead;
    let str = '';
    const style = function (index){
      let s;
      if(type === 'y'){
        s = `height: ${styles[index].height}; width: 14px;`
      }else{
        s = `width: ${styles[index].width}; height: 14px;`;
      }
      return s;
    }
    const itemStyle = function (index){
      let s;
      if(type === 'y'){
        s = `height: ${styles[index].h / 2}px; width: 14px;`
      }else{
        s = `width: ${styles[index].w / 2}px; height: 14px;`;
      }
      return s;
    }
    arr.map((item, index) => {
      str += `
        <div class="table-item table-item-${type}" style="${style(index)};">
          <div class="item-befor" style="${itemStyle(index)}">
            <div class="table-item-hover-b item-befor-${type}" data-index="${type}-${index}-0"></div>
          </div>
          <div class="item-after" style="${itemStyle(index)}">
            <div class="table-item-hover-a item-after-${type}" data-index="${type}-${index}-1"></div>
          </div>
        </div>
      `
    })
    return str;
  }
  addEvent(){
    this.container.onclick = this.addRowOrCol.bind(this);
    this.table.oninput = this.onInput.bind(this);
  }
  addRowOrCol(e){
    const infoStr = e.target.dataset.index;
    if(!infoStr) return;
    const infoArr = infoStr.split('-');
    const changeArr = infoArr[0] === 'x' ? this.deafultThead : this.deafultTbody;
    const startIndex = parseInt(infoArr[1], 10) + parseInt(infoArr[2], 10);
    changeArr.splice(startIndex, 0, {});
    if(infoArr[0] === 'x'){
      this.copyDeafultTbody(startIndex);
    }
    this.init();
  }
  copyDeafultTbody(index){
    this.deafultTbody = this.deafultTbody.map(item => {
      const values = [];
      for(let i in item){
        values.push(item[i])
      }
      values.splice(index, 0, '');
      values.forEach((_item, index) => {
        item[index] = _item;
      })
      return item;
    })
  }
  onInput(e) {
    const rows = this.table.rows;
    for(var i=0; i<rows.length;i++){ //遍历表格的行
      for(var j=0;j<rows[i].cells.length;j++){  //遍历每行的列
        const _key = this.deafultThead[j].key || j;
        this.deafultTbody[i][_key] = rows[i].cells[j].innerHTML;
      }
   }
  }
  getStyles(tags){
    const styles = [];
    const getStyle = window.getComputedStyle ? window.getComputedStyle : window.currentStyle;
    for(let i = 0; i < tags.length; i++){
      const style = getStyle(tags[i], null)
      styles.push({
        width: style.width,
        height: style.height,
        w: parseInt(style.width, 10),
        h: parseInt(style.height, 10)
      })
    }
    return styles;
  }  
} 

const table = new Table('table');