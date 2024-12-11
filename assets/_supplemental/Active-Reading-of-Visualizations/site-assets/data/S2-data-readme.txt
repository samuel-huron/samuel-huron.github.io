The data file for Study S2 is a csv file where each row is a participant trial, and columns are the following:

"pid": the participant uinque id

"order": the order in which the participant performed the experiment (A,B,C, or D):
					"A": [
						{"technique" : 0, "task" : 0},
						{"technique" : 0, "task" : 1},
						{"technique" : 1, "task" : 0},
						{"technique" : 1, "task" : 1}
					],
					"B": [
						{"technique" : 0, "task" : 1},
						{"technique" : 0, "task" : 0},
						{"technique" : 1, "task" : 1},
						{"technique" : 1, "task" : 0}
					],
					"C": [
						{"technique" : 1, "task" : 0},
						{"technique" : 1, "task" : 1},
						{"technique" : 0, "task" : 0},
						{"technique" : 0, "task" : 1}
					],
					"D": [
						{"technique" : 1, "task" : 1},
						{"technique" : 1, "task" : 0},
						{"technique" : 0, "task" : 1},
						{"technique" : 0, "task" : 0}
					]

"step": step within the order of the experiment (S0,S1,S2, or S3)

"technique": the condition (active or baseline)

"task": the task (degree of reach)

"size": the number of nodes in the graph (n20, n40 or n80)

"trial": the repetition number within the four repetitions for each block (0,1,2, or 3)

"pAnswer": the participant answer

"correctAnswer": the correct answer

"startTime": the time at which the trial started

"endTime": the time at which the trial ended

"completionTime": the total completion time of the trial (endTime - startTime)

"clicksLink": the number of times a link was selected during the trial

"clicksNode": the number of times a node was selected during the trial

"penDownTime": the total time the pen was touching the screen

