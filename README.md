# ABTestReal Developer Introduction Task
## Application functionality
1.The user fills cells within a table on a web page and enters dates for users of some abstract system in the following format:

| UserId | Registration Date | Last activity date |
| --- | ---| --- |
| 1 | [dd.mm.yyyy] | [dd.mm.yyyy] |
| 2 | [dd.mm.yyyy] | [dd.mm.yyyy] |
| 3 | [dd.mm.yyyy] | [dd.mm.yyyy] |
| ... | ... | ... |
| 5 | [dd.mm.yyyy] | [dd.mm.yyyy] |

2.When user click `Save` the data are saved to the database

3.When user click `Calculate` for the saved data:

   - These metrics are calculated:
     - Rolling Retention 7 day. Rolling Retention X day = (number of users who returned to the system on the Xth day after registration or later) / (number of users who registered in the system X days ago or earlier) * 100%
     - Average of users lifespans (lifespan is the amount of time in days from registration to the last activity)
     - Median of users lifespans
     - 10th and 90th percentile of users lifespans
 
   - A histogram of the distribution of user lifespans is drawn. The user can select the logarithmic or linear scale of the diagram
