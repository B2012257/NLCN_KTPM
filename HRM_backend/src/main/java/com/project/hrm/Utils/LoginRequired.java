package com.project.hrm.Utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD) //Áp dụng cho phương thức
@Retention(RetentionPolicy.RUNTIME) // Ton tại theo thời gian chương trình
public @interface LoginRequired {
}