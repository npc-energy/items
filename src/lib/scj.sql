-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-06-04 09:19:00
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scj`
--

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT '商品id',
  `title` varchar(100) NOT NULL COMMENT '商品标题',
  `nowPrice` double NOT NULL COMMENT '新价',
  `oldPrice` double NOT NULL COMMENT '原价',
  `num` int(10) NOT NULL COMMENT '库存',
  `pic` varchar(255) NOT NULL COMMENT '商品图片',
  `details` varchar(255) NOT NULL COMMENT '商品描述'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `title`, `nowPrice`, `oldPrice`, `num`, `pic`, `details`) VALUES
(1, '职业连衣裙2019新款女夏女士气质女神范衣服收腰显瘦正式场合裙子', 109, 128, 100, '[{"src":"../image/main1.jpg"},{"src":"../image/detailpic1.jpg"},{"src":"../image/detailpic2.jpg"},{"src":"../image/detailpic3.jpg"},{"src":"../image/detailpic4.jpg"},{"src":"../image/detailpic5.jpg"}]', '职业连衣裙2019新款女夏女士气质女神范衣服收腰显瘦正式场合裙子'),
(2, '清凉莫代尔睡衣女套装', 189, 199, 200, '[{"src":"../image/main2.jpg"}]', '柔软亲肤'),
(3, 'D1851 大码女装韩版夏季2018休闲加肥宽松胖mm印花连帽t恤连衣裙', 2340, 1, 30, '[{"src":"../image/main3.jpg"}]', '一机多用，无绳便捷'),
(4, '套装大码女装胖mm2019夏装新款韩版时尚条纹百搭休闲两件套12230', 419, 699, 40, '[{"src":"../image/main4.jpg"}]', '套装大码女装胖mm2019夏装新款韩版时尚条纹百搭休闲两件套12230'),
(5, '【秒杀】三星 Galaxy A6s全面屏 性价比智能手机全网通4G', 69, 99, 50, '[{"src":"../image/main5.jpg"}]', '【秒杀】三星 Galaxy A6s全面屏 性价比智能手机全网通4G'),
(6, '三星Galaxy A9s(SM-A9200)全面屏手机 后置四摄', 298, 598, 60, '[{"src":"../image/main6.jpg"}]', '三星Galaxy A9s(SM-A9200)全面屏手机 后置四摄'),
(7, 'SAMSUNG/三星 GalaxyS10e（SM-G9700)超感官全视屏 全网通', 33.9, 36.9, 70, '[{"src":"../image/main7.jpg"}]', 'SAMSUNG/三星 GalaxyS10e（SM-G9700)超感官全视屏 全网通'),
(8, '【现货速发】SAMSUNG/三星 Galaxy A60 超广角拍照', 99, 110, 80, '[{"src":"../image/main8.jpg"}]', '【现货速发】SAMSUNG/三星 Galaxy A60 超广角拍照');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL COMMENT 'id名',
  `user_name` varchar(10) NOT NULL COMMENT '用户名',
  `user_email` varchar(20) NOT NULL COMMENT '邮箱',
  `user_pwd` varchar(20) NOT NULL COMMENT '密码',
  `user_sex` tinyint(2) NOT NULL COMMENT '性别'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_pwd`, `user_sex`) VALUES
(1000001, 'scj', 'scj@163.com', 'scj123', 1),
(1000002, 'zhangsan', 'zhangsan@163.com', 'zhangsan123', 1),
(1000003, 'lisi', 'lisi@163.com', 'lisi123', 0),
(1000004, 'wangwu', 'zhaoliu@163.com', 'zhaoliu123', 1),
(1000018, '55555', '55555', 'null', 0),
(1000015, '141515', '111', 'null', 0),
(1000016, '12313', '11111', 'null', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id名', AUTO_INCREMENT=1000019;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
