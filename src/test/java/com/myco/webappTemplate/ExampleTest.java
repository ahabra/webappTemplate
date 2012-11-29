package com.myco.webappTemplate;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class ExampleTest {
	private Example example;
	
	@Before
	public void before() {
		example= new Example();
	}
	
	@Test
	public void testAdd() {
		assertEquals(3, example.add(1, 2));
	}

}
