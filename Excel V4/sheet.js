class Sheet {
    constructor(div, id, sheetStyle) {
        this.div = div;
        this.id = id;
        this.sheetSize = sheetStyle.sheetSize;
        this.cellSize = sheetStyle.cellSize;
        this.extraFunction = sheetStyle.extraFunction;
        this.createFrame();
        this.createColumnHeader();
        this.createRowHeader();
        this.createTable();

    }
    //创建表名-id格式的字符串
    createId(str) {
        let divId = this.id + "-" + str;
        return divId;
    }
    //创建相应命名的div
    createNamedDiv(str) {
        let div = document.createElement("div");
        div.classList.add(str);
        div.id = this.createId(str);
        return div;
    }
    //create frame of sheet
    createFrame() {
        let sheet = this.createNamedDiv("sheet");
        let header = this.createNamedDiv("header");
        let corner = this.createNamedDiv("corner");
        let columnHeader = this.createNamedDiv("columnHeader");
        header.appendChild(corner);
        header.appendChild(columnHeader);
        sheet.appendChild(header);
        let wrapper = this.createNamedDiv("wrapper");
        let rowHeader = this.createNamedDiv("rowHeader");
        let table = this.createNamedDiv("table");
        wrapper.appendChild(rowHeader);
        wrapper.appendChild(table);
        sheet.appendChild(wrapper);
        this.div.appendChild(sheet);
    }

    //创建sheet中的columnheader，同根据是否需resize去添加相应的模块
    createColumnHeader() {
        let columnHeaderTable = this.createNamedDiv("columnHeaderTable");
        for (let i = 0; i < this.sheetSize.columnNum; i++) {
            let columnHeaderCell = document.createElement("div");
            columnHeaderCell.classList.add("columnHeaderCell");
            columnHeaderCell.innerHTML = Convert.toLetter(i + 1);
            columnHeaderCell.id=this.id+"-"+Convert.toLetter(i+1);
            columnHeaderCell.style.width=this.cellSize.width+"px";
            if (this.extraFunction.resize === true) {
                this.addChangeWidth(columnHeaderCell);
            }
            columnHeaderTable.appendChild(columnHeaderCell);
        }
        let columnHeader = document.getElementById(this.id + "-columnHeader");
        columnHeader.appendChild(columnHeaderTable);
    }
    //创建sheet中的rowheader，同根据是否需resize去添加相应的模块
    createRowHeader() {
        let rowHeaderTable = this.createNamedDiv("rowHeaderTable");
        for (let i = 0; i < this.sheetSize.rowNum; i++) {
            let rowHeaderCell = document.createElement("div");
            rowHeaderCell.classList.add("rowHeaderCell");
            rowHeaderCell.style.height=this.cellSize.height+"px";
            rowHeaderCell.id = this.id + "-" + (i + 1);
            rowHeaderCell.innerHTML = i + 1;
            if (this.extraFunction.resize === true) {
                this.addChangeHeight(rowHeaderCell);
            }
            rowHeaderTable.appendChild(rowHeaderCell);
        }
        let rowHeader = document.getElementById(this.id + "-rowHeader");
        rowHeader.appendChild(rowHeaderTable);
    }
    //创建表格的主要table部分
    createTable(){
        let table =this.createNamedDiv("mainTable");
        let tableBody=this.createNamedDiv("tableBody");
        if(this.extraFunction.editability===true){
            tableBody.addEventListener("dblclick",this.input);
        }
        for(let i=0;i<this.sheetSize.rowNum;i++){
            let tableRow=this.addRow(i);
            tableBody.appendChild(tableRow);
        }
        table.appendChild(tableBody);
        let sheet=document.getElementById(this.id+"-table");
        sheet.appendChild(table);
    }
    //支持resize添加本函数
    addChangeWidth(columnHeaderCell) {
        let cellChild = document.createElement("div");
        cellChild.classList.add("columnChild");
        cellChild.addEventListener("mouseover", this.changeWidth.bind(this));
        columnHeaderCell.appendChild(cellChild);
    }
    //支持resize添加本函数
    addChangeHeight(rowHeaderCell) {
        let cellChild = document.createElement("div");
        cellChild.classList.add("rowChild");
        cellChild.addEventListener("mouseover", this.changeHeight.bind(this));
        rowHeaderCell.appendChild(cellChild);
    }
    //增加一行
    addRow(rowOrder) {
        let tableRow=document.createElement("div");
        tableRow.style.height=this.cellSize.height+"px";
        for(let i=0;i<this.sheetSize.columnNum;i++){
            let tableCell=document.createElement("div");
            tableCell.classList.add("tableCell");
            tableCell.style.width=this.cellSize.width+"px";
            tableRow.appendChild(tableCell);
        }
        tableRow.id=this.id+"tableRow"+(rowOrder+1);

        tableRow.classList.add("tableRow");
        return tableRow;
    }
    //增加一列
    addColumn(columnOrder) {
        let tableRow = document.getElementById(this.id + "-tableBody").children;
        for (let i = 0; i < this.row; i++) {
            let cell = document.createElement("div");
            cell.classList.add("tableCell");
            tableRow[i].children[columnOrder].before(cell);
        }
    }
    //更改行宽
    changeWidth(event) {
        let startX = 0;
        let initialWidth = 0;
        let changeDiv = event.target.parentNode;
        let SheetId = this.id;
        event.target.addEventListener("mousedown", mousedown);
        event.target.addEventListener("mouseleave", mouseleave);
        function mousedown(event) {
            if (event.button !== 0) {
                return false;
            }
            startX = event.clientX;
            initialWidth = changeDiv.clientWidth;
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseup);

        }
        function mousemove(event) {
            changeDiv.style.width = initialWidth + (event.clientX - startX) + "px";
            let column = document.getElementById(SheetId + "-tableBody").children;
            let length = column.length;
            let name = Tools.divideId(changeDiv.id)[1];
            let num = Convert.toNumber(name);
            for (let i = 0; i < length; i++) {
                column[i].children[num - 1].style.width = initialWidth + (event.clientX - startX) + "px";
            }
        }
        function mouseup() {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            event.target.removeEventListener("mouseleave", mouseleave);
            document.removeEventListener("mouseup", mouseup);
        }
        function mouseleave() {
            event.target.removeEventListener("mousedown", mousedown);
            event.target.removeEventListener("mouseleave", mouseleave);
        }
    }
    //更改列高
    changeHeight(event) {
        let startY = 0;
        let initialHeight = 0;
        let changeDiv = event.target.parentNode;
        let sheetId = this.id;
        event.target.addEventListener("mousedown", mousedown);
        event.target.addEventListener("mouseleave", mouseleave);
        function mousedown(event) {
            if (event.button !== 0) {
                return false;
            }
            startY = event.clientY;
            initialHeight = changeDiv.clientHeight;
            document.addEventListener("mousemove",mousemove);
            document.addEventListener("mouseup",mouseup);
        }
        function mousemove(event) {
            changeDiv.style.height = initialHeight + (event.clientY - startY) + "px";
            let row = document.getElementById(sheetId + "-tableBody").children;
            let name = Tools.divideId(changeDiv.id)[1];
            row = row[name - 1];
            row.style.height = initialHeight + (event.clientY - startY) + "px";
        }
        function mouseup() {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            event.target.removeEventListener("mouseleave", mouseleave);
            document.removeEventListener("mouseup", mouseup);
        }
        function mouseleave() {
            event.target.removeEventListener("mousedown", mousedown);
            event.target.removeEventListener("mouseleave", mouseleave);
        }
    }
    //文档编辑功能
    
    input(event) {
        if (Status.editability === true) {
            return false;
        }
        Status.changeEdit(true);
        let target = event.target;
        let input = document.createElement("input");
        input.id = "input";
        let content = target.innerHTML;
        input.value = content;
        target.innerHTML = "";
        target.appendChild(input);
        input.focus;
        document.body.addEventListener("click", judge);
        function judge(event) {
            if (event.target.id != "input" && Status.editability === true) {
                write();
            }
        }
        function write() {
            let content = document.getElementById("input").value;
            target.firstChild.remove();
            target.innerHTML = content;
            document.body.removeEventListener("click", judge);
            Status.changeEdit(false);
        }
    }



}