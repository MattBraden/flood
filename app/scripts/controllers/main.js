'use strict';

angular.module('floodGame')
	.controller('MainCtrl', function ($scope, $timeout) {
		var COLORS = ['red', 'yellow', 'blue', 'orange', 'purple', 'green'];

		// Create 14x14 board
		$scope.createBoard = function () {
			$scope.board = new Array(14);
			for (var i = 0; i < $scope.board.length; i++) {
				$scope.board[i] = new Array(14);
			}
			$scope.reset();
		};

		$scope.reset = function () {
			$scope.count = 0;
			// Put colors onto board
			for (var i = 0; i < $scope.board.length; i++) {
				for (var j = 0; j < $scope.board.length; j++) {
					$scope.board[i][j] = {};
					// Insert random color
					$scope.board[i][j].color = COLORS[Math.floor(Math.random() * (COLORS.length))];
					$scope.board[i][j].controlled = false;
				}
			}

			// Set the first tile to controlled
			$scope.board[0][0].controlled = true;
			$scope.currentColor = $scope.board[0][0].color;
			$scope.updateBoard();
		};

		$scope.tileClick = function (tile) {
			if (tile.color === $scope.currentColor) {
				return;
			}
			$scope.currentColor = tile.color;
			$scope.count++;
			$scope.updateBoard();

			if ($scope.isDone()) {
				$timeout(function () {
					$scope.reset();
				}, 2000);
			}
		};

		$scope.updateBoard = function () {
			for (var i = 0; i < $scope.board.length; i++) {
				for (var j = 0; j < $scope.board.length; j++) {
					if ($scope.board[i][j].controlled === true) {
						$scope.checkNeighbors(i, j);
						$scope.board[i][j].color = $scope.currentColor;
					}
				}
			}

		};

		$scope.checkNeighbors = function (row, col) {
			// This is hacky, but it gets the job done :)
			// Check above
			if (row - 1 >= 0) {
				if ($scope.board[row - 1][col].color === $scope.currentColor) {
					if ($scope.board[row - 1][col].controlled === false) {
						$scope.board[row - 1][col].controlled = true;
						$scope.checkNeighbors(row - 1, col);
					}
				}
			}

			// Check below
			if (row + 1 < $scope.board.length) {
				if ($scope.board[row + 1][col].color === $scope.currentColor) {
					if ($scope.board[row + 1][col].controlled === false) {
						$scope.board[row + 1][col].controlled = true;
						$scope.checkNeighbors(row + 1, col);
					}
				}
			}

			// Check left
			if (col - 1 >= 0) {
				if ($scope.board[row][col - 1].color === $scope.currentColor) {
					if ($scope.board[row][col - 1].controlled === false) {
						$scope.board[row][col - 1].controlled = true;
						$scope.checkNeighbors(row, col - 1);
					}
				}
			}

			// Check right
			if (col + 1 < $scope.board.length) {
				if ($scope.board[row][col + 1].color === $scope.currentColor) {
					if ($scope.board[row][col + 1].controlled === false) {
						$scope.board[row][col + 1].controlled = true;
						$scope.checkNeighbors(row, col + 1);
					}
				}
			}
		};

		$scope.isDone = function () {
			for (var i = 0; i < $scope.board.length; i++) {
				for (var j = 0; j < $scope.board.length; j++) {
					if ($scope.board[i][j].controlled === false) {
						return false;
					}
				}
			}
			return true;
		};

		$scope.getColor = function (count) {
			if (count > 25) {
				return {
					color: '#FF3B30'
				};
			}
		};

		// Init 
		$scope.createBoard();
	});