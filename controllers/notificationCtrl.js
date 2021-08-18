const Notifications = require('../models/notificationModel')

// sorting and paginating

class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	sorting() {
		if(this.queryString.sort) {
			const sortBy =  this.queryString.sort.split(',').join(' ')

			this.query = this.query.sort(sortBy)
		}else {
			this.query = this.query.sort('-createdAt')
		}

		return this;
	}


	paginating() {
		const page = this.queryString.page * 1 || 1
		const limit = this.queryString.limit * 1 || 8
		skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit)

		return this;
	}
}


const NotificationCtrl = {
	getNotifications: async (req, res) => {
		try {
			const features = new APIfeatures(Notifications.find(), req.query).sorting().paginating()
			const notifications = await features.query

			res.json({
				status: 'success',
				result: notifications.length,
				notifications: notifications
			})
		} catch(err) {
			return res.status(500).json({msg: err.message});
		}
	},

	deleteNotifications: async (req, res) => {
		try {
			await Notifications.findByIdAndDelete(req.params.id)

			res.json({msg: "Xóa thông báo"})
		} catch(err) {
			return res.status(500).json({msg: err.message});
		}
	}
}

module.exports = NotificationCtrl