import request from '@/utils/request';
import { getDesignList } from '@/pages/Production/service';
import { getDesignerList } from '@/pages/Designer/service';
import { getCompanyList } from '@/pages/Brand/service';

/**
 *  查询搜索结果统计
 */
export function getSearchResultTotal(params) {
  return request('/dms/works/number/1.2', { method: 'GET', params });
}

/**
 * 查询原创作品列表
 */
export function getSearchResult0(params) {
  return getDesignList(params)
}

/**
 * 查询设计师列表
 */
export function getSearchResult1(params) {
  return getDesignerList(params);
}

/**
 * 查询企业列表
 */
export function getSearchResult2(params) {
  return getCompanyList(params);
}
