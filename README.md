# Task Manager API

Task manager is advanced CRUD application with many hidden features that could be not so noticable at first sight. In this short description I'll try to walk you through some of them.

Task manager consumes browser's `localeStorage` as source of data and cloud, i think there is no need to configure server for such a small application.

first of all pay attention to message that appears when you run application very first time.

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/init%20alert.JPG)

every time application runs, it's just checks weather or not you have already tasks set in your browser's locale storage (eg. is this the first run in current browser). If not app will do it for you automatically, loading into storage some `MOCK_TASKS`.

    initializeStorage(): void {
        const storage: string | null = window.localStorage.getItm('tasks')
        if(!storage){
            window.localStorage.setItem(MOCK_TASKS)
        }
    }
    
 ![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/customized-tasks.png)
 
`MOCK_TASKS` is special customized bunch of tasks. it contains similar task titles, addresses , various deadlines and statuses wich allows you more easily test features of app like searching , filtering , sorting , pagination , notifications , restrictions , confirm popups , alerts and more. Though you are free to manipulate them as you wish.


# 1. Form Validations

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/validation-error.png)

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/validation-succes.png)

* <b>Add task form</b>
    * All fields are required.
    * Deadline must be valid date format (if written by hand).
    * Deadline can't be earlier than today.
    <br/>
* <b>Filter tab form</b>
    * Min date can't be greater than max date.
    * Max date can't be smaller than min date.
    
![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/date-picker-restriction.png)

*All invalid forms have an appropriate error message and visual feedback.*

# 2. Filters and Search

Filter section is available in left sidebar , click on top left corner menu item to open it.

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/filter-search.pngc)

* <h3>Filters are available for</h3>

    * <b>*Deadline*</b>
        * <small>shorthands for </small> TODAY , TOMMOROW
        * <small>within particular date scope (min date, max date)</small>
    * <b>*Status*</b>
        * <small>In progress</small>
        * <small>Done</small>
        * <small>Missed</small>
    * <b>*Place name*</b>
        * <small>selection list of all place names</small>
    * <b>*Address*</b>
        * <small>selection list of all addresses</small>

* <h3>Composal Filtration</h3>
    Filters are composal both with each other and with search term as well. this means you can compose any filter combination and complicate it even more with searching. There is also fallback template in case nothing is found for given terms or no task registered at all.
    <br/>
    <br/>

* <h3>Filter Toggler</h3>

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/filters-on.JPG)
![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/filters-of.JPG)

You have ability to temporarily disable filters without having to reset them and then enable it back again. This is helpful when you performed some hard filtration and want for a moment look at some record that is not listed in results.
    <br/>
    <br/>

* <h3>Filter Logic</h3>

<h4>1. Prevent inconsistency</h4>
    
*Deadline scope (min date, max date) and Deadline shorthands (TODAY , TOMMOROW) filters can't be composed , since it isn't make sense.
therefore interaction with one automatically resets the other*.
    
<h4>2. Toggler smart auto enabling</h4>

*When filters are disabled by toggler, interacting with filter form will cause automatic enabling, supposing you were intended perform   filtration and just forgot to switch it on.*

<h4>3. Invalid filter combinations warnings</h4>

*Consider this. you've filtered deadline to be today or tommorow or in any scope that starts from today or later, and also filtered status to be missed. this isn't make sense right ? 
Record's deadline should be at least passed to consider it is missed , of course in case it is not marked as done already.
So this kind of combination will end up with snackbar hint , warning you that it will never give any results and suggests to do a simple automatic fix.<br/>
PS. Same thing with <strong>passed date</strong> and status <strong>in progress</strong>.*

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/snackbar.png)

<h4>4. Auto detecting and generating address shorthands</h4>

*Besides listing all the addresses inside selection list in filter tab, application also generates some address shorthands automatically in run time depending on what keywords are often used.
For example: assume you have several records with similar addresses ( `Abovyan 14`, `Abovyan 28/3`, `Abovyan 92 Appt. 5`).
Here the keyword is `Abovyan`. And since it was already used 3 times, keyword will be retrieved and automatically generated as a seperate option when filtering and will provide all 3 addresses mentioned above. It gives much more convinience when filtering, though the others explicitly specified addresses also will stay in the list.*

    function generateShorthandAdresses() {

        const sourceAddresses = storage.map(task => task.address);
        let words = [];

        sourceAddresses.forEach(address => {
            words = words.concat(address.split(' '));
        })

                
        /* checking case insensivity, and applying regexp 
        to ensure value doesn't contains any number. */

        normalize(words)

        const keywords = new Set(words);
        const shorthands = [];

        keywords.forEach(keyword => {
            let matchCount = 0;
            for(let word of words){
                if(word === keyword){
                    matchCount++;
                    if(matchCount === 3){
                        shorthands.push(keyword);
                        break;
                    }
                }
            }
        })

        return shorthands;

    }



# 3. Manipulating Data: Restrictions and Confirm windows

Usually you are free to `ADD`, `EDIT`, `REMOVE`, `MARK AS DONE`, `MARK AS UNDONE` every task from it's action menu. Also you are able to `REMOVE ALL TASKS`, `REMOVE MISSED TASKS`, `MARK ALL AS DONE` from global action menu on top right corner of dashboard. But there are some unpredictable cases that may occure and they are handled either with restrictions or confirm messages.

### Confirm windows.

Almost all actions that can't be undone and quite permanently are handled wtih confirmation windows. Messages in confirmation windows are always contextual and gives short and simple representation of situation.

Some windows act just as a warning while the others expect your confirmation to continue.

Some examples of confirmation and alert window messages:

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/alert-example.JPG)

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/confirm-example.JPG)

### Restrictions

Some of actions are logically blocked for certain situations.
* You are unable to `EDIT` completed tasks. You are able to `REMOVE` them or `MARK AS UNDONE` .
* You are unable to `MARK AS DONE` tasks that are missed. You are able to `REMOVE` or `EDIT` them.
* Here we encounter the first unpredictable case. When we are editing missed tasks, it turns out their deadline's are out of date. Also we remember that validation on Deadline form doesn't allow us to use dates earlier than today.
That's why we're receiving alert message wich states :
> This task was missed therefore it's deadline has passed.
Turn deadline to valid date first to be able accept editing.


* The other unpredictable case rises up when we're trying to `MARK AS UNDONE` some completed task, but the deadline is already passed. This will eventually end up with making task missed and as mentioned in second paragraph , we are unable perform `MARK AS DONE` on missed tasks. So it looks like this will be one way road. therefore application asks you for confirmation are you really know what you are doing. message looks like :
> Deadline of this task has already passed.
After you mark it as undone marking back as done will be blocked.
Confirm to continue.


*In two words functionality is non static and depends on certain situation. the only thing you can always do is to* `REMOVE` *task*.

# 4. Sorting and Pagination

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/sorting-up.png)

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/sorting-down.png)

Sorting is available by every field for both ascending and descending directions. Except status field, for obvious reason (it's just doesn't make sense). There are 3 sorted states on each field `Ascending`, `Descending`, `Default` (not sorted). Different fields perform sorting by different algorithms. for example `Title` column sorted alphabetically, whereas column `Deadline` will be sorted according to dates. 

*By default items are sorted according to their creation.*

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/paginator.JPG)

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/pafinator-per-page.JPG)

Also available configureable (setting items quantity per page) paginator. Worth to be noted that on every data filtration or search performing action paginator programatically resets it's page index to first one. This way we avoid unpredictable bug sources.

*Consider this. we are on paginator's second page and want to do some data filtration or search. Assume it ends up with two results. Paginator will get empty and one can think that there are no results, though we just need go to first page to find them.*

# 5. Notifications and HELP

On top right corner you can see 2 items. First of them stands for notification box and reminder for user not to miss tasks.
![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/notifications.JPG)

#### Notification box has 3 layers of feedback, every next is more obvious.

1. Red badge, indicating how many tasks are running out of deadline today.
2. List of task titles via `tooltip` when hovering over the box. Tooltip has limit of showing max 10 tasks for design purposes. Everything remains will be shown as `{{x - 10}} more` (e.g. If you have 23 tasks for today it will show 10 of them following "and 13 more").
3. To see more you should click on box wich will open seperate dialog for full today tasks list, with basic information and interaction tools as well (`REMOVE`, `MARK AS DONE`).

![](https://raw.githubusercontent.com/rafayel23/Task-manager/master/Task-manager-app/src/assets/today-tasks.JPG)



#### And Finally HELP button is the one who redirects you to this page.

<br/>
<br/>

### Thanks for reading

<span><a href="https://rafayel23.github.io/Task-manager-production/">click here</a> to run application</span>

# HAPPY HACKNIG