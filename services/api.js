import axios from 'axios'
import Auth from '../services/auth'
import {turnonProgress, turnoffProgress} from '../store'
const server_address = 'https://vsip.gitosolutions.com/api'

const genHeader = () => {
	const auth = new Auth()
	if(auth.checkAuth()) {
		let token = auth.getToken()
		return {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	} else {
		return {'Content-Type': 'application/json'}
	}
}

let checkTime = {}
export const API = ({method='GET',route='',data={},params={},responseType='', cache}) => {
	let time = new Date().getTime()
	if(!Object.keys(checkTime).length){
		turnOnProgress()
		
	}
	checkTime = {}
	checkTime[time] = turnOffProgress
	return new Promise((resolve,reject) => {
		return axios({
			baseURL: server_address,
			url: route + (cache ? "" : '?stuff='+new Date().getTime()),
			method,
			params,
			data,
			headers: genHeader(),
			responseType
		}).then((res) => {
			resolve(res.data)
			if(!!checkTime[time]){
				checkTime[time]()
				delete checkTime[time]
			}
		}).catch(err => {
			reject(err)
			if(!!checkTime[time]){
				checkTime[time]()
				delete checkTime[time]
			}
		})
	})
}

export const signin = (data) => {
	return API({
		method:'POST',
		route:'/signin',
		data,
	})
}

export const signup = (data) => {
	return API({
		method:'POST',
		route:'/signup',
		data,
	})
}

export const filterUser = (data) => {
	return API({
		method: 'POST',
		route: '/search/user',
		data,
	})
}

export const filterRole = (data) => {
	return API({
		method: 'POST',
		route: '/search/role',
		data
	})
}

export const searchEvent = (data) => {
	return API({
		method: 'POST',
		route: '/search/event',
		data,
	})
}

export const getEvent = (id) => {
	return API({
		method: 'GET',
		route: `/event/${id}`,
	})
}

export const getStatusEvent = (id) => {
	return API({
		method: 'GET',
		route: `/event/${id}/status`,
	})
}

export const createEvent = (data) => {
	return API({
		method: 'POST',
		route: `/event`,
		data
	})
}

export const updateEvent = (id,data) => {
	return API({
		method: 'PUT',
		route: `/event/${id}`,
		data
	})
}

export const attendEvent = (id) => {
	return API({
		method: 'POST',
		route: `/event/${id}/attended`,
	})
}

export const noAttendEvent = (id) => {
	return API({
		method: 'POST',
		route: `/event/${id}/notattended`,
	})
}

export const addReferenceEvent = (eventId, data) => {
	return API({
		method: 'POST',
		route: `/event/${eventId}/add-reference/`,
		data
	})
}

export const removeReferenceEvent = (eventId, referenceId) => {
	return API({
		method: 'DELETE',
		route: `/event/${eventId}/remove-reference/${referenceId}`
	})
}

export const changeStatusEvent = (id,data) => {
	return API({
		method: 'PUT',
		route: `/event/${id}/changestatus`,
		data
	})
}

export const eventSendMailAndExport = (id,data) => {
	return API({
		method: 'POST',
		route: `/event/${id}/sendmail`,
		data
	})
}

export const filerDepartment = (data) => {
	return API({
		method: 'POST',
		route: `/search/department`,
		data
	})
}

export const getDepartment = _=> {
	return API({
		route: '/department'
	})
}

export const getUserByDepartment = _ => {
	return API({
		method: 'POST',
		route: `/department/user`
	})
}

export const createDepartment = (data) => {
	return API({
		method: "POST",
		route: "/department",
		data
	})
}

export const updateDepartment = (id, data) => {
	return API({
		method: "PUT",
		route: `/department/${id}`,
		data
	})
}

export const getDepartmentWithUser = (data) => {
	return API({
		method: "POST",
		route: `/department/user`,
		data
	})
}

export const deleteDepartment = (id) => {
	return API({
		method: "DELETE",
		route: `/department/${id}`,
	})
}

export const getGroup = _=> {
	return API({
		route: '/group'
	})
}

export const createGroup = (data) => {
	return API({
		method: 'POST',
		route: '/group',
		data
	})
}

export const updateGroup = (id, data) => {
	return API({
		method: "PUT",
		route: `/group/${id}`,
		data
	})
}

export const deleteGroupTenant = (id) => {
	return API({
		method: "DELETE",
		route: `/group/${id}`
	})
}

export const filterJob = (data) => {
	return API({
		method: 'POST',
		route: '/search/jobCorner',
		data
	})
}

export const getJob = (id) => {
	return API({
		method: 'GET',
		route: `/jobCorner/${id}`,
	})
}

export const createJob = (data) => {
	return API({
		method: 'POST',
		route: `/jobCorner`,
		data
	})
}

export const deleteJob = (id) => {
	return API({
		method: 'DELETE',
		route: `/jobCorner/${id}`,
	})
}

export const newApplyJob = (id,data) => {
	return API({
		method: 'POST',
		route: `/jobCorner/${id}/applylist`,
		data
	})
}

export const submitUpdateJob = (id,data) => {
	return API({
		method: 'PUT',
		route: `/jobCorner/${id}`,
		data
	})
}

export const approveJob = (id,data) => {
	return API({
		method: "POST",
		route: `jobCorner/approve/${id}`,
		data
	})
}

export const searchNotify = (data) => {
	return API({
		method: 'POST',
		route: '/search/notification',
		data
	})
}

export const getNotifyDetail = (data) => {
	return API({
		route: `/notification/${data}`
	})
}

export const getFile = (path) => {
	return API({
		route: `/${path}`,
		responseType: 'blob',
		cache: true,
	})
}

export const createTenant = (data) => {
	return API({
		method: 'POST',
		route: '/tenants',
		data
	})
}

export const getAllTenants = _=> {
	return API({
		route: '/tenants'
	})
}

export const getTenantDetail = (id) => {
	return API({
		route: `/tenants/${id}`
	})
}

export const updateTenant = (id, data) => {
	return API({
		method: 'PUT',
		route: `/tenants/${id}`,
		data
	})
}

export const createCategory = (data) => {
	return API({
		method: 'POST',
		route: '/category',
		data
	})
}

export const searchCategory = (data) => {
	return API({
		method: 'POST',
		route: '/search/category',
		data
	})
}

export const updateCategory = (id, data) => {
	return API({
		method: 'PUT',
		route: `/category/${id}`,
		data
	})
}

export const listCategoryByTab = (data) => {
	return API({
		method: 'POST',
		route: `/tenants/listCategoryByTab/${data}`
	})
}

export const listTenantByCategory = (data) => {
	return API({
		method: 'POST',
		route: `/tenants/listTenantByCategory/${data}`
	})
}

export const deleteCategory = (id) => {
	return API({
		method: 'DELETE',
		route: `/category/${id}`,
	})
}

export const getAllCategory = _ => {
	return API({
		method: 'POST',
		route: "/search/category"
	})
}

export const getAllLocation = _ => {
	return API({
		method: 'POST',
		route: "/search/location"
	})
}

export const createLocation = (data) => {
	return API({
		method: 'POST',
		route: '/location',
		data
	})
}

export const updateLocation = (id, data) => {
	return API({
		method: 'PUT',
		route: `/location/${id}`,
		data
	})
}

export const deleteLocation = (id) => {
	return API({
		method: 'DELETE',
		route: `/location/${id}`,
	})
}

export const uploadFile = (data) => {
	return API({
		method: 'POST',
		route: '/upload/file',
		data
	})
}

export const createNotification = (data) => {
	return API({
		method: 'POST',
		route: '/notification',
		data
	})
}

export const updateBookmark = (id, data) => {
	return API({
		method: 'PUT',
		route: `/notification/${id}/bookmark`,
		data
	})
}

export const updateStatus = (id, data) => {
	return API({
		method: 'PUT',
		route: `/notification/${id}/changestatus`,
		data
	})
}

export const searchUser = (data) => {
	return API({
		method: "POST",
		route: '/search/user',
		data
	})
}

export const getUserGroup = () => {
	return API({
		method: 'GET',
		route: '/user/group',
	})
}

export const getListUserAndTenants = () => {
	return API({
		method: 'GET',
		route: '/tenants/list/user',
	})	
}


export const updateNotify = (id, data) => {
	return API({
		method: 'PUT',
		route: `/notification/${id}`,
		data
	})
}

/** IR **/

export const searchIR = (data) => {
	return API({
		method: 'POST',
		route: '/search/ir',
		data,
	})
}

export const getIR = (id) => {
	return API({
		method: 'GET',
		route: `/ir/${id}`,
	})
}

export const createIR = (data) => {
	return API({
		method: 'POST',
		route: `/ir`,
		data
	})
}

export const updateIR = (id,data) => {
	return API({
		method: 'PUT',
		route: `/ir/${id}`,
		data
	})
}

export const updateStatusIR = (id, data) => {
	return API({
		method: 'PUT',
		route: `/ir/${id}/changestatus`,
		data
	})
}

export const getDepartmentByTenant = (id) => {
	return API({
		method: 'GET',
		route: `/user/department/${id}`,
	})
}

export const getDepartmentByUser = _ => {
	return API({
		route: '/user/department'
	})
}

export const updateUser = (data) => {
	return API({
		method: 'PUT',
		route: '/user',
		data
	})
}

export const updateUserById = (id, data) => {
	return API({
		method: 'PUT',
		route: `/user/${id}`,
		data
	})
}

export const getPromotion = _ => {
	return API({
		route: '/promotion'
	})
}

export const getPromoDetail = (id) => {
	return API({
		method: 'GET',
		route: `/promotion/${id}`,
	})
}

export const createPromo = (data) => {
	return API({
		method: 'POST',
		route: '/promotion',
		data
	})
}

export const searchPromo = (data) => {
	return API({
		method: "POST",
		route: "/search/promotion",
		data
	})
}


export const approvePromo = (id,data) => {
	return API({
		method: "POST",
		route: `promotion/approve/${id}`,
		data
	})
}

export const deletePromo = (id) => {
	return API({
		method: "DELETE",
		route: `/promotion/${id}`
	})
}

export const updatePromo = (id, data) => {
	return API({
		method: "PUT",
		route: `/promotion/${id}`,
		data
	})
}

export const createBanner = (data) => {
	return API({
		method: 'POST',
		route: '/banner',
		data
	})
}

export const getBannerById = (id) => {
	return API({
		method: 'GET',
		route: `/banner/${id}`
	})
}

export const searchBanner = (data) => {
	return API({
		method: 'POST',
		route: '/search/banner',
		data
	})
}

export const updateBanner = (id, data) => {
	return API({
		method: 'PUT',
		route: `/banner/${id}`,
		data
	})
}

export const deleteBanner = (id) => {
	return API({
		method: 'DELETE',
		route: `/banner/${id}`
	})
}

export const addElementBanner = (id,data) => {
	return API({
		method: 'POST',
		route: `/banner/${id}/addelement`,
		data
	})
}

export const deleteElementBanner = (idBanner, idElement) => {
	return API({
		method: 'DELETE',
		route: `/banner/${idBanner}/deleteelement/${idElement}`
	})
}

export const createDesignation = (data) => {
	return API({
		method: "POST",
		route: "/designation",
		data
	})
}

export const updateDesignation = (id, data) => {
	return API({
		method: "PUT",
		route: `/designation/${id}`,
		data
	})
}

export const searchDesignation = (id, data) => {
	return API({
		method: "POST",
		route: "/search/designation",
		data
	})
}

export const designationDetail = (id) => {
	return API({
		method: "GET",
		route: `/designation/${id}`
	})
}

export const createDeptgroup = (data) => {
	return API({
		method: "POST",
		route: "/deptgroup",
		data
	})
}

export const updateDeptgroup = (id, data) => {
	return API({
		method: "PUT",
		route: `/deptgroup/${id}`,
		data
	})
}

export const searchDeptgroup = (id, data) => {
	return API({
		method: "POST",
		route: "/search/deptgroup",
		data
	})
}

export const deptgroupDetail = (id) => {
	return API({
		method: "GET",
		route: `/deptgroup/${id}`
	})
}

export const deleteDeptGroup = (id) => {
	return API({
		method: 'DELETE',
		route: `deptgroup/${id}`
	})
}

export const getInspecting = () => {
	return API({
		route: '/inspecting'
	})
}

export const createInspecting = (data) => {
	return API({
		method: 'POST',
		route: '/inspecting',
		data
	})
}

export const updateInspecting = (id, data) => {
	return API({
		method: 'PUT',
		route: `/inspecting/${id}`,
		data
	})
}

export const deleteInspecting = (id) => {
	return API({
		method: 'DELETE',
		route: `/inspecting/${id}`,
	})
}

export const forgetPassword = (data) => {
	return API({
		method: 'POST',
		route: '/helpers/forgot-password',
		data
	})
}

export const resetPassword = (data) => {
	return API({
		method: 'POST',
		route: '/helpers/reset-password',
		data
	})
}

export const resendEmail = (data) => {
	return API({
		method: "POST",
		route: '/user/re-send/active',
		data
	})
}

export const activeAccount = (data) => {
	return API({
		method: 'POST',
		route: '/helpers/active-account',
		data
	})
}

export const phoneBookVsip = (data) => {
	return API({
		method: "POST",
		route: '/phonebook/vsip',
		data
	})
}

export const phoneBookTenant = (data) => {
	return API({
		method: "POST",
		route: '/phonebook/tenant',
		data
	})
}

export const searchTenant = (data) => {
	return API({
		method: 'POST',
		route: '/search/tenants/extra',
		data
	})
}

export const createMasterBanner = (data) => {
	return API({
		method: 'POST',
		route: '/master-banner',
		data
	})
}

export const updateMasterBanner = (id, data) => {
	return API({
		method: 'PUT',
		route: `/master-banner/${id}`,
		data
	})
}

export const searchMasterBanner = (data) => {
	return API({
		method: 'POST',
		route: '/search/master-banner',
		data
	})
}

export const deleteMasterBanner = (id) => {
	return API({
		method: 'DELETE',
		route: `/master-banner/${id}`,
	})
}

export const resendEmailByTab = (data) => {
	return API({
		method: 'POST',
		route: '/user/re-send/active/list',
		data
	})
}

export const indexBanner = (data) => {
	return API({
		method: 'POST',
		route: '/master-banner/indexing',
		data
	})
}

export const getListTenantAccount = (data) => {
	return API({
		method: 'POST',
		route: `/tenants/utils/list-tenant`,
		data
	})
}



