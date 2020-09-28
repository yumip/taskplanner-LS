
export default class Task {
    constructor(title, description, assignee, date, time, priority, status, id) {
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.status = status;
        this.id = id||null; //double check id? id:null
    };
    toHtmlElement() {
      const html = this.toHtmlString();
      return document.createRange().createContextualFragment(html);
    }
    toHtmlString() {
        const html = `
          <div data-task class="task">
            <div  class="row">
              <div class = "col-lg-6 order-2 order-lg-1">
                <a href="#newTaskInput" data-edit-button role="button" class="d-inline btn btn-link col-2 ml-0 pl-0  text-dark" data-toggle="modal" data-target="#newTaskInput">
                  <i class="fas fa-edit text-secondary"></i></a>
                  <p class = "text-left d-inline"> <sapn class="h5"> ${this.title}</span> 
                  <a href="#task${this.id}Description" class="text-secondary icon ml-0 pl-0 small" data-toggle="collapse" data-target="#task${this.id}Description"> See More
                </a></p>
              </div>
              <div class="col-lg-6 order-1 order-lg-2">
                <ul class = "row justify-content-between taskSummary" >
                  <li class="col-4 col-sm-1 order-1 order-sm-1">
                  <i class = "fas fa-exclamation-triangle ${this.priority}" data-toggle = "tooltip" data-placement = "top" title = "Priority"></i>
                  </li>
                  <li class="col-4 col-sm-1 order-2 order-sm-2 text-center">
                    <i class="icon fas fa-star ${this.status}" data-toggle="tooltip" data-placement="top" title="Status"></i>
                  </li>
                  <li class="col-6 col-sm-4 order-4 order-sm-3 text-sm-right">
                    ${this.date} ${this.time}
                  </li>
                  <li class="col-6 col-sm-4 order-5 order-sm-4 text-sm-center text-right">
                  ${this.assignee}
                  </li>
                  <li class="col-4 col-sm-1 order-3 order-sm-5 text-right">
                    <form class="bin" action="" method="post">
                      <button type="button" class="ml-0 pl-0 btn btn-link text-secondary"><i class="icon fas fa-trash"></i></button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
            <div id="task${this.id}Description" class="collapse">
                  ${this.description}
            </div>
            <hr>
          </div>`;
      return html;
    };
}